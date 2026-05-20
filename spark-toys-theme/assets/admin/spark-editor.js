/* Spark Editor — admin UI. Uses WP's bundled wp-element/wp-components/wp-api-fetch.
   No build step. Loaded only on Appearance → Spark Editor. */
(function (wp, sparkEditor) {
    if (!wp || !sparkEditor) return;

    const { createElement: h, useState, useEffect, Fragment } = wp.element;
    const { Button, TabPanel, Notice, TextControl, Spinner } = wp.components;
    const apiFetch = wp.apiFetch;

    apiFetch.use(apiFetch.createNonceMiddleware(sparkEditor.nonce));
    apiFetch.use(apiFetch.createRootURLMiddleware(sparkEditor.restRoot.replace(/\/spark-toys\/v1$/, '/')));

    /* Open the native WP media frame and return the selected attachment */
    function pickMedia(opts) {
        return new Promise(function (resolve) {
            const frame = wp.media({
                title: opts.title || 'Select file',
                button: { text: 'Use this file' },
                multiple: false,
                library: { type: opts.type || 'image' },
            });
            frame.on('select', function () {
                const att = frame.state().get('selection').first().toJSON();
                resolve(att);
            });
            frame.open();
        });
    }

    function HeroTab() {
        const [video1, setVideo1] = useState(sparkEditor.hero.video_1 || '');
        const [video2, setVideo2] = useState(sparkEditor.hero.video_2 || '');
        const [saving, setSaving] = useState(false);
        const [notice, setNotice] = useState(null);

        function save(next) {
            setSaving(true);
            setNotice(null);
            apiFetch({
                path: '/spark-toys/v1/hero',
                method: 'POST',
                data: next,
            }).then(function (res) {
                setVideo1(res.video_1 || '');
                setVideo2(res.video_2 || '');
                setNotice({ status: 'success', text: 'נשמר' });
            }).catch(function (err) {
                setNotice({ status: 'error', text: (err && err.message) || 'שמירה נכשלה' });
            }).finally(function () {
                setSaving(false);
            });
        }

        function replaceSlot(slot) {
            pickMedia({ title: 'בחר וידאו', type: 'video' }).then(function (att) {
                if (!att || !att.url) return;
                const next = slot === 1
                    ? { video_1: att.url }
                    : { video_2: att.url };
                save(next);
            });
        }

        function clearSlot(slot) {
            save(slot === 1 ? { video_1: '' } : { video_2: '' });
        }

        return h('div', { className: 'spark-section' },
            notice && h(Notice, { status: notice.status, isDismissible: true, onRemove: function () { setNotice(null); } }, notice.text),
            h('p', { className: 'spark-help' }, 'שני סרטונים מופיעים בקרוסלת ה-Hero בעמוד הבית. אם השדה ריק, ייעשה שימוש בקובץ ברירת המחדל מתיקיית התבנית.'),

            [1, 2].map(function (slot) {
                const url = slot === 1 ? video1 : video2;
                const fallback = slot === 1 ? sparkEditor.defaults.video_1 : sparkEditor.defaults.video_2;
                const effective = url || fallback;
                return h('div', { className: 'spark-slot', key: 'slot-' + slot },
                    h('h3', null, 'סרטון ' + slot),
                    h('div', { className: 'spark-slot-row' },
                        h('div', { className: 'spark-preview' },
                            effective
                                ? h('video', { src: effective, controls: true, muted: true, playsInline: true })
                                : h('div', { className: 'spark-preview-empty' }, 'אין סרטון')
                        ),
                        h('div', { className: 'spark-slot-actions' },
                            h(Button, { variant: 'primary', onClick: function () { replaceSlot(slot); }, disabled: saving }, url ? 'החלף סרטון' : 'בחר סרטון'),
                            url && h(Button, { variant: 'secondary', isDestructive: true, onClick: function () { clearSlot(slot); }, disabled: saving }, 'אפס לברירת מחדל'),
                            url && h('p', { className: 'spark-url' }, url)
                        )
                    )
                );
            }),
            saving && h(Spinner, null)
        );
    }

    function CategoryRow(props) {
        const [imageUrl, setImageUrl] = useState(props.cat.image_url || '');
        const [title, setTitle] = useState(props.cat.display_title || '');
        const [saving, setSaving] = useState(false);
        const [notice, setNotice] = useState(null);

        function persist(next) {
            setSaving(true);
            setNotice(null);
            apiFetch({
                path: '/spark-toys/v1/category/' + props.cat.id,
                method: 'POST',
                data: next,
            }).then(function (res) {
                if ('image_url' in next) setImageUrl(res.image_url || '');
                if ('display_title' in next) setTitle(res.display_title || '');
                setNotice({ status: 'success', text: 'נשמר' });
            }).catch(function (err) {
                setNotice({ status: 'error', text: (err && err.message) || 'שמירה נכשלה' });
            }).finally(function () {
                setSaving(false);
            });
        }

        function pickImage() {
            pickMedia({ title: 'בחר תמונה', type: 'image' }).then(function (att) {
                if (!att || !att.url) return;
                persist({ image_url: att.url });
            });
        }

        return h('div', { className: 'spark-cat-row' },
            h('div', { className: 'spark-cat-meta' },
                h('h3', null, props.cat.name),
                h('code', null, props.cat.slug),
                notice && h(Notice, { status: notice.status, isDismissible: true, onRemove: function () { setNotice(null); } }, notice.text)
            ),
            h('div', { className: 'spark-cat-image' },
                imageUrl
                    ? h('img', { src: imageUrl, alt: '' })
                    : h('div', { className: 'spark-preview-empty' }, 'ברירת מחדל'),
                h('div', { className: 'spark-slot-actions' },
                    h(Button, { variant: 'primary', onClick: pickImage, disabled: saving }, imageUrl ? 'החלף תמונה' : 'בחר תמונה'),
                    imageUrl && h(Button, { variant: 'secondary', isDestructive: true, onClick: function () { persist({ image_url: '' }); }, disabled: saving }, 'אפס')
                )
            ),
            h('div', { className: 'spark-cat-title' },
                h(TextControl, {
                    label: 'כותרת תצוגה (אופציונלי)',
                    value: title,
                    onChange: setTitle,
                    help: 'אם השדה ריק, יוצג שם הקטגוריה המקורי.'
                }),
                h(Button, { variant: 'secondary', onClick: function () { persist({ display_title: title }); }, disabled: saving }, 'שמור כותרת')
            ),
            saving && h(Spinner, null)
        );
    }

    function CategoriesTab() {
        const cats = sparkEditor.categories || [];
        if (!cats.length) {
            return h('p', null, 'לא נמצאו קטגוריות מוצר.');
        }
        return h('div', { className: 'spark-section' },
            h('p', { className: 'spark-help' }, 'לכל קטגוריה ניתן להגדיר תמונה וכותרת מותאמות. אם שדה נשאר ריק, ייעשה שימוש בערכי ברירת המחדל מהתבנית.'),
            cats.map(function (cat) {
                return h(CategoryRow, { key: cat.id, cat: cat });
            })
        );
    }

    function App() {
        return h(TabPanel, {
            className: 'spark-editor-tabs',
            activeClass: 'is-active',
            tabs: [
                { name: 'hero', title: 'Hero' },
                { name: 'categories', title: 'קטגוריות' },
            ],
        }, function (tab) {
            if (tab.name === 'hero') return h(HeroTab, null);
            return h(CategoriesTab, null);
        });
    }

    function mount() {
        const root = document.getElementById('spark-editor-root');
        if (!root) return;
        if (wp.element.createRoot) {
            wp.element.createRoot(root).render(h(App, null));
        } else {
            wp.element.render(h(App, null), root);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})(window.wp, window.sparkEditor);
