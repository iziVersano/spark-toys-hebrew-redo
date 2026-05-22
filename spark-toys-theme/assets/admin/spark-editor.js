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
        const [urls, setUrls] = useState({
            1: sparkEditor.hero.video_1 || '',
            2: sparkEditor.hero.video_2 || '',
            3: sparkEditor.hero.video_3 || '',
        });
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
                setUrls({
                    1: res.video_1 || '',
                    2: res.video_2 || '',
                    3: res.video_3 || '',
                });
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
                const next = {};
                next['video_' + slot] = att.url;
                save(next);
            });
        }

        function clearSlot(slot) {
            const next = {};
            next['video_' + slot] = '';
            save(next);
        }

        return h('div', { className: 'spark-section' },
            notice && h(Notice, { status: notice.status, isDismissible: true, onRemove: function () { setNotice(null); } }, notice.text),
            h('p', { className: 'spark-help' }, 'עד שלושה סרטונים מופיעים בקרוסלת ה-Hero בעמוד הבית, בסדר 1 → 2 → 3. אם השדה ריק, ייעשה שימוש בקובץ ברירת המחדל מתיקיית התבנית.'),

            [1, 2, 3].map(function (slot) {
                const url = urls[slot];
                const fallback = sparkEditor.defaults['video_' + slot];
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

    function ProductPickerTab(props) {
        const initial = (props.initial && props.initial.products) || [];
        const [selected, setSelected] = useState(initial.slice(0, props.max));
        const [query, setQuery] = useState('');
        const [results, setResults] = useState([]);
        const [searching, setSearching] = useState(false);
        const [saving, setSaving] = useState(false);
        const [notice, setNotice] = useState(null);

        useEffect(function () {
            const t = setTimeout(function () {
                setSearching(true);
                apiFetch({
                    path: '/spark-toys/v1/products/search?q=' + encodeURIComponent(query),
                }).then(function (res) {
                    setResults(Array.isArray(res) ? res : []);
                }).catch(function () {
                    setResults([]);
                }).finally(function () {
                    setSearching(false);
                });
            }, 250);
            return function () { clearTimeout(t); };
        }, [query]);

        function persist(next) {
            setSaving(true);
            setNotice(null);
            apiFetch({
                path: props.endpoint,
                method: 'POST',
                data: { product_ids: next.map(function (p) { return p.id; }) },
            }).then(function (res) {
                setSelected(res.products || []);
                setNotice({ status: 'success', text: 'נשמר' });
            }).catch(function (err) {
                setNotice({ status: 'error', text: (err && err.message) || 'שמירה נכשלה' });
            }).finally(function () {
                setSaving(false);
            });
        }

        function add(prod) {
            if (selected.find(function (s) { return s.id === prod.id; })) return;
            const next = (selected.length >= props.max) ? selected.slice(1).concat([prod]) : selected.concat([prod]);
            persist(next);
        }

        function remove(id) {
            persist(selected.filter(function (s) { return s.id !== id; }));
        }

        return h('div', { className: 'spark-section' },
            notice && h(Notice, { status: notice.status, isDismissible: true, onRemove: function () { setNotice(null); } }, notice.text),
            h('p', { className: 'spark-help' }, props.help),

            h('h3', null, 'מוצרים נבחרים (' + selected.length + '/' + props.max + ')'),
            h('div', { className: 'spark-hot-selected' },
                selected.length === 0 && h('p', { className: 'spark-help' }, 'אין מוצרים נבחרים — יוצגו ברירות המחדל.'),
                selected.map(function (p) {
                    return h('div', { className: 'spark-hot-card', key: 'sel-' + p.id },
                        p.image ? h('img', { src: p.image, alt: '' }) : h('div', { className: 'spark-preview-empty' }, 'אין תמונה'),
                        h('div', { className: 'spark-hot-meta' },
                            h('strong', null, p.name),
                            p.sku && h('code', null, p.sku),
                            p.price && h('span', null, '₪' + p.price)
                        ),
                        h(Button, { variant: 'secondary', isDestructive: true, onClick: function () { remove(p.id); }, disabled: saving }, 'הסר')
                    );
                })
            ),

            h('h3', null, 'חיפוש מוצרים'),
            h(TextControl, {
                label: 'חיפוש לפי שם',
                value: query,
                onChange: setQuery,
                placeholder: 'התחל להקליד...'
            }),
            searching && h(Spinner, null),
            h('div', { className: 'spark-hot-results' },
                results.map(function (p) {
                    const isSelected = !!selected.find(function (s) { return s.id === p.id; });
                    return h('div', { className: 'spark-hot-card', key: 'res-' + p.id },
                        p.image ? h('img', { src: p.image, alt: '' }) : h('div', { className: 'spark-preview-empty' }, 'אין תמונה'),
                        h('div', { className: 'spark-hot-meta' },
                            h('strong', null, p.name),
                            p.sku && h('code', null, p.sku),
                            p.price && h('span', null, '₪' + p.price)
                        ),
                        isSelected
                            ? h(Button, { variant: 'secondary', disabled: true }, 'כבר נבחר')
                            : h(Button, { variant: 'primary', onClick: function () { add(p); }, disabled: saving }, 'בחר')
                    );
                })
            ),
            saving && h(Spinner, null)
        );
    }

    function HotProductsTab() {
        return h(ProductPickerTab, {
            initial: sparkEditor.hotProducts,
            endpoint: '/spark-toys/v1/hot-products',
            max: 2,
            help: 'בחר עד שני מוצרים שיוצגו בקטע "מוצרים חמים של החודש". אם לא נבחר אף מוצר, יוצגו ברירות המחדל.'
        });
    }

    function FeaturedProductsTab() {
        return h(ProductPickerTab, {
            initial: sparkEditor.featuredProducts,
            endpoint: '/spark-toys/v1/featured-products',
            max: 8,
            help: 'בחר עד 8 מוצרים שיוצגו בקטע "מוצרים שילדים אוהבים". אם לא נבחר אף מוצר, יוצגו המוצרים המסומנים כ-Featured בוורדפרס.'
        });
    }

    function App() {
        return h(TabPanel, {
            className: 'spark-editor-tabs',
            activeClass: 'is-active',
            tabs: [
                { name: 'hero', title: 'Hero' },
                { name: 'categories', title: 'קטגוריות' },
                { name: 'hot', title: 'מוצרים חמים' },
                { name: 'featured', title: 'מוצרים מובילים' },
            ],
        }, function (tab) {
            if (tab.name === 'hero') return h(HeroTab, null);
            if (tab.name === 'hot') return h(HotProductsTab, null);
            if (tab.name === 'featured') return h(FeaturedProductsTab, null);
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
