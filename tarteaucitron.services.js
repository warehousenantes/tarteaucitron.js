/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// google analytics multiple
tarteaucitron.services.multiplegtag = {
    "key": "multiplegtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {

        var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '_gcl_au'];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
                cookies.push('_ga_' + ua.replace(/G-/g, ''));
            });
        }

        return cookies;
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];

        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.multiplegtagUa[0], '', function () {
            window.gtag = function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());

            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};
                gtag('config', ua, additional_config_info);
            });

            if (typeof tarteaucitron.user.multiplegtagMore === "function") {
                tarteaucitron.user.multiplegtagMore();
            }
        });
    }
}

// facebook pixel
tarteaucitron.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src', '_fbp'],
    "js": function () {
        "use strict";

        var n;
        if (window.fbq) return;
        n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tarteaucitron.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
            tarteaucitron.user.facebookpixelMore();
        }
    }
}

// tiktok
tarteaucitron.services.tiktok = {
    key: "tiktok",
    type: "analytic",
    name: "Tiktok",
    uri: "https://www.tiktok.com/legal/tiktok-website-cookies-policy",
    needConsent: true,
    cookies: [],
    js: function () {
        "use strict";
        !function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];
            ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                }
            };
            for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                return e
            }, ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a)
            };
            ttq.load(tarteaucitron.user.tiktokId);
            ttq.page();
        }(window, document, 'ttq');

        if (typeof tarteaucitron.user.tiktokMore === "function") {
            tarteaucitron.user.tiktokMore();
        }
    },
}

// snapchat
tarteaucitron.services.snapchat = {
    key: "snapchat",
    type: "analytic",
    name: "Snapchat",
    uri: "https://snap.com/fr-FR/privacy/privacy-policy",
    needConsent: true,
    cookies: [],
    js: function () {
        "use strict";
        if (null !== tarteaucitron.user.snapchatId) {
            (function(win, doc, sdk_url){
                if(win.snaptr) return;
                var tr=win.snaptr=function(){
                    tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);
                };
                tr.queue = [];
                var s='script';
                var new_script_section=doc.createElement(s);
                new_script_section.async=!0;
                new_script_section.src=sdk_url;
                var insert_pos=doc.getElementsByTagName(s)[0];
                insert_pos.parentNode.insertBefore(new_script_section, insert_pos);
            })(window, document, 'https://sc-static.net/scevent.min.js');

            snaptr('init', tarteaucitron.user.snapchatId);
            snaptr('track', 'PAGE_VIEW');

            if (typeof tarteaucitron.user.snapchatMore === "function") {
                tarteaucitron.user.snapchatMore();
            }
        }
    },
}

// googlemaps embed iframe
tarteaucitron.services.googlemapsembed = {
    "key": "googlemapsembed",
    "type": "api",
    "name": "Google Maps Embed",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapsembed'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google maps iframe'),
              width = tarteaucitron.getElemWidth(x),
              height = tarteaucitron.getElemHeight(x),
              url = x.getAttribute("data-url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapsembed';
        tarteaucitron.fallback(['googlemapsembed'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
}