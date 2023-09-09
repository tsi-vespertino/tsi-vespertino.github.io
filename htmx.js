(function(e, t) {
    if (typeof define === "function" && define.amd) {
        define([], t)
    } else if (typeof module === "object" && module.exports) {
        module.exports = t()
    } else {
        e.htmx = e.htmx || t()
    }
}
)(typeof self !== "undefined" ? self : this, function() {
    return function() {
        "use strict";
        var G = {
            onLoad: t,
            process: Nt,
            on: le,
            off: ue,
            trigger: oe,
            ajax: xr,
            find: b,
            findAll: f,
            closest: d,
            values: function(e, t) {
                var r = er(e, t || "post");
                return r.values
            },
            remove: U,
            addClass: B,
            removeClass: n,
            toggleClass: V,
            takeClass: j,
            defineExtension: Cr,
            removeExtension: Rr,
            logAll: X,
            logNone: F,
            logger: null,
            config: {
                historyEnabled: true,
                historyCacheSize: 10,
                refreshOnHistoryMiss: false,
                defaultSwapStyle: "innerHTML",
                defaultSwapDelay: 0,
                defaultSettleDelay: 20,
                includeIndicatorStyles: true,
                indicatorClass: "htmx-indicator",
                requestClass: "htmx-request",
                addedClass: "htmx-added",
                settlingClass: "htmx-settling",
                swappingClass: "htmx-swapping",
                allowEval: true,
                inlineScriptNonce: "",
                attributesToSettle: ["class", "style", "width", "height"],
                withCredentials: false,
                timeout: 0,
                wsReconnectDelay: "full-jitter",
                wsBinaryType: "blob",
                disableSelector: "[hx-disable], [data-hx-disable]",
                useTemplateFragments: false,
                scrollBehavior: "smooth",
                defaultFocusScroll: false,
                getCacheBusterParam: false,
                globalViewTransitions: false,
                methodsThatUseUrlParams: ["get"]
            },
            parseInterval: v,
            _: e,
            createEventSource: function(e) {
                return new EventSource(e,{
                    withCredentials: true
                })
            },
            createWebSocket: function(e) {
                var t = new WebSocket(e,[]);
                t.binaryType = G.config.wsBinaryType;
                return t
            },
            version: "1.9.4"
        };
        var C = {
            addTriggerHandler: bt,
            bodyContains: re,
            canAccessLocalStorage: M,
            findThisElement: he,
            filterValues: ar,
            hasAttribute: o,
            getAttributeValue: Z,
            getClosestAttributeValue: Y,
            getClosestMatch: c,
            getExpressionVars: gr,
            getHeaders: ir,
            getInputValues: er,
            getInternalData: ee,
            getSwapSpecification: sr,
            getTriggerSpecs: Ge,
            getTarget: de,
            makeFragment: l,
            mergeObjects: ne,
            makeSettleInfo: S,
            oobSwap: me,
            querySelectorExt: ie,
            selectAndSwap: De,
            settleImmediately: Wt,
            shouldCancel: Qe,
            triggerEvent: oe,
            triggerErrorEvent: ae,
            withExtensions: w
        };
        var R = ["get", "post", "put", "delete", "patch"];
        var O = R.map(function(e) {
            return "[hx-" + e + "], [data-hx-" + e + "]"
        }).join(", ");
        function v(e) {
            if (e == undefined) {
                return undefined
            }
            if (e.slice(-2) == "ms") {
                return parseFloat(e.slice(0, -2)) || undefined
            }
            if (e.slice(-1) == "s") {
                return parseFloat(e.slice(0, -1)) * 1e3 || undefined
            }
            if (e.slice(-1) == "m") {
                return parseFloat(e.slice(0, -1)) * 1e3 * 60 || undefined
            }
            return parseFloat(e) || undefined
        }
        function J(e, t) {
            return e.getAttribute && e.getAttribute(t)
        }
        function o(e, t) {
            return e.hasAttribute && (e.hasAttribute(t) || e.hasAttribute("data-" + t))
        }
        function Z(e, t) {
            return J(e, t) || J(e, "data-" + t)
        }
        function u(e) {
            return e.parentElement
        }
        function K() {
            return document
        }
        function c(e, t) {
            while (e && !t(e)) {
                e = u(e)
            }
            return e ? e : null
        }
        function T(e, t, r) {
            var n = Z(t, r);
            var i = Z(t, "hx-disinherit");
            if (e !== t && i && (i === "*" || i.split(" ").indexOf(r) >= 0)) {
                return "unset"
            } else {
                return n
            }
        }
        function Y(t, r) {
            var n = null;
            c(t, function(e) {
                return n = T(t, e, r)
            });
            if (n !== "unset") {
                return n
            }
        }
        function h(e, t) {
            var r = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector;
            return r && r.call(e, t)
        }
        function q(e) {
            var t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
            var r = t.exec(e);
            if (r) {
                return r[1].toLowerCase()
            } else {
                return ""
            }
        }
        function i(e, t) {
            var r = new DOMParser;
            var n = r.parseFromString(e, "text/html");
            var i = n.body;
            while (t > 0) {
                t--;
                i = i.firstChild
            }
            if (i == null) {
                i = K().createDocumentFragment()
            }
            return i
        }
        function H(e) {
            return e.match(/<body/)
        }
        function l(e) {
            var t = !H(e);
            if (G.config.useTemplateFragments && t) {
                var r = i("<body><template>" + e + "</template></body>", 0);
                return r.querySelector("template").content
            } else {
                var n = q(e);
                switch (n) {
                case "thead":
                case "tbody":
                case "tfoot":
                case "colgroup":
                case "caption":
                    return i("<table>" + e + "</table>", 1);
                case "col":
                    return i("<table><colgroup>" + e + "</colgroup></table>", 2);
                case "tr":
                    return i("<table><tbody>" + e + "</tbody></table>", 2);
                case "td":
                case "th":
                    return i("<table><tbody><tr>" + e + "</tr></tbody></table>", 3);
                case "script":
                    return i("<div>" + e + "</div>", 1);
                default:
                    return i(e, 0)
                }
            }
        }
        function Q(e) {
            if (e) {
                e()
            }
        }
        function L(e, t) {
            return Object.prototype.toString.call(e) === "[object " + t + "]"
        }
        function A(e) {
            return L(e, "Function")
        }
        function N(e) {
            return L(e, "Object")
        }
        function ee(e) {
            var t = "htmx-internal-data";
            var r = e[t];
            if (!r) {
                r = e[t] = {}
            }
            return r
        }
        function I(e) {
            var t = [];
            if (e) {
                for (var r = 0; r < e.length; r++) {
                    t.push(e[r])
                }
            }
            return t
        }
        function te(e, t) {
            if (e) {
                for (var r = 0; r < e.length; r++) {
                    t(e[r])
                }
            }
        }
        function k(e) {
            var t = e.getBoundingClientRect();
            var r = t.top;
            var n = t.bottom;
            return r < window.innerHeight && n >= 0
        }
        function re(e) {
            if (e.getRootNode && e.getRootNode()instanceof window.ShadowRoot) {
                return K().body.contains(e.getRootNode().host)
            } else {
                return K().body.contains(e)
            }
        }
        function P(e) {
            return e.trim().split(/\s+/)
        }
        function ne(e, t) {
            for (var r in t) {
                if (t.hasOwnProperty(r)) {
                    e[r] = t[r]
                }
            }
            return e
        }
        function y(e) {
            try {
                return JSON.parse(e)
            } catch (e) {
                x(e);
                return null
            }
        }
        function M() {
            var e = "htmx:localStorageTest";
            try {
                localStorage.setItem(e, e);
                localStorage.removeItem(e);
                return true
            } catch (e) {
                return false
            }
        }
        function D(t) {
            try {
                var e = new URL(t);
                if (e) {
                    t = e.pathname + e.search
                }
                if (!t.match("^/$")) {
                    t = t.replace(/\/+$/, "")
                }
                return t
            } catch (e) {
                return t
            }
        }
        function e(e) {
            return hr(K().body, function() {
                return eval(e)
            })
        }
        function t(t) {
            var e = G.on("htmx:load", function(e) {
                t(e.detail.elt)
            });
            return e
        }
        function X() {
            G.logger = function(e, t, r) {
                if (console) {
                    console.log(t, e, r)
                }
            }
        }
        function F() {
            G.logger = null
        }
        function b(e, t) {
            if (t) {
                return e.querySelector(t)
            } else {
                return b(K(), e)
            }
        }
        function f(e, t) {
            if (t) {
                return e.querySelectorAll(t)
            } else {
                return f(K(), e)
            }
        }
        function U(e, t) {
            e = s(e);
            if (t) {
                setTimeout(function() {
                    U(e);
                    e = null
                }, t)
            } else {
                e.parentElement.removeChild(e)
            }
        }
        function B(e, t, r) {
            e = s(e);
            if (r) {
                setTimeout(function() {
                    B(e, t);
                    e = null
                }, r)
            } else {
                e.classList && e.classList.add(t)
            }
        }
        function n(e, t, r) {
            e = s(e);
            if (r) {
                setTimeout(function() {
                    n(e, t);
                    e = null
                }, r)
            } else {
                if (e.classList) {
                    e.classList.remove(t);
                    if (e.classList.length === 0) {
                        e.removeAttribute("class")
                    }
                }
            }
        }
        function V(e, t) {
            e = s(e);
            e.classList.toggle(t)
        }
        function j(e, t) {
            e = s(e);
            te(e.parentElement.children, function(e) {
                n(e, t)
            });
            B(e, t)
        }
        function d(e, t) {
            e = s(e);
            if (e.closest) {
                return e.closest(t)
            } else {
                do {
                    if (e == null || h(e, t)) {
                        return e
                    }
                } while (e = e && u(e));
                return null
            }
        }
        function r(e) {
            var t = e.trim();
            if (t.startsWith("<") && t.endsWith("/>")) {
                return t.substring(1, t.length - 2)
            } else {
                return t
            }
        }
        function W(e, t) {
            if (t.indexOf("closest ") === 0) {
                return [d(e, r(t.substr(8)))]
            } else if (t.indexOf("find ") === 0) {
                return [b(e, r(t.substr(5)))]
            } else if (t.indexOf("next ") === 0) {
                return [_(e, r(t.substr(5)))]
            } else if (t.indexOf("previous ") === 0) {
                return [z(e, r(t.substr(9)))]
            } else if (t === "document") {
                return [document]
            } else if (t === "window") {
                return [window]
            } else {
                return K().querySelectorAll(r(t))
            }
        }
        var _ = function(e, t) {
            var r = K().querySelectorAll(t);
            for (var n = 0; n < r.length; n++) {
                var i = r[n];
                if (i.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_PRECEDING) {
                    return i
                }
            }
        };
        var z = function(e, t) {
            var r = K().querySelectorAll(t);
            for (var n = r.length - 1; n >= 0; n--) {
                var i = r[n];
                if (i.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_FOLLOWING) {
                    return i
                }
            }
        };
        function ie(e, t) {
            if (t) {
                return W(e, t)[0]
            } else {
                return W(K().body, e)[0]
            }
        }
        function s(e) {
            if (L(e, "String")) {
                return b(e)
            } else {
                return e
            }
        }
        function $(e, t, r) {
            if (A(t)) {
                return {
                    target: K().body,
                    event: e,
                    listener: t
                }
            } else {
                return {
                    target: s(e),
                    event: t,
                    listener: r
                }
            }
        }
        function le(t, r, n) {
            Tr(function() {
                var e = $(t, r, n);
                e.target.addEventListener(e.event, e.listener)
            });
            var e = A(r);
            return e ? r : n
        }
        function ue(t, r, n) {
            Tr(function() {
                var e = $(t, r, n);
                e.target.removeEventListener(e.event, e.listener)
            });
            return A(r) ? r : n
        }
        var fe = K().createElement("output");
        function ce(e, t) {
            var r = Y(e, t);
            if (r) {
                if (r === "this") {
                    return [he(e, t)]
                } else {
                    var n = W(e, r);
                    if (n.length === 0) {
                        x('The selector "' + r + '" on ' + t + " returned no matches!");
                        return [fe]
                    } else {
                        return n
                    }
                }
            }
        }
        function he(e, t) {
            return c(e, function(e) {
                return Z(e, t) != null
            })
        }
        function de(e) {
            var t = Y(e, "hx-target");
            if (t) {
                if (t === "this") {
                    return he(e, "hx-target")
                } else {
                    return ie(e, t)
                }
            } else {
                var r = ee(e);
                if (r.boosted) {
                    return K().body
                } else {
                    return e
                }
            }
        }
        function ve(e) {
            var t = G.config.attributesToSettle;
            for (var r = 0; r < t.length; r++) {
                if (e === t[r]) {
                    return true
                }
            }
            return false
        }
        function ge(t, r) {
            te(t.attributes, function(e) {
                if (!r.hasAttribute(e.name) && ve(e.name)) {
                    t.removeAttribute(e.name)
                }
            });
            te(r.attributes, function(e) {
                if (ve(e.name)) {
                    t.setAttribute(e.name, e.value)
                }
            })
        }
        function pe(e, t) {
            var r = Or(t);
            for (var n = 0; n < r.length; n++) {
                var i = r[n];
                try {
                    if (i.isInlineSwap(e)) {
                        return true
                    }
                } catch (e) {
                    x(e)
                }
            }
            return e === "outerHTML"
        }
        function me(e, i, a) {
            var t = "#" + J(i, "id");
            var o = "outerHTML";
            if (e === "true") {} else if (e.indexOf(":") > 0) {
                o = e.substr(0, e.indexOf(":"));
                t = e.substr(e.indexOf(":") + 1, e.length)
            } else {
                o = e
            }
            var r = K().querySelectorAll(t);
            if (r) {
                te(r, function(e) {
                    var t;
                    var r = i.cloneNode(true);
                    t = K().createDocumentFragment();
                    t.appendChild(r);
                    if (!pe(o, e)) {
                        t = r
                    }
                    var n = {
                        shouldSwap: true,
                        target: e,
                        fragment: t
                    };
                    if (!oe(e, "htmx:oobBeforeSwap", n))
                        return;
                    e = n.target;
                    if (n["shouldSwap"]) {
                        Pe(o, e, e, t, a)
                    }
                    te(a.elts, function(e) {
                        oe(e, "htmx:oobAfterSwap", n)
                    })
                });
                i.parentNode.removeChild(i)
            } else {
                i.parentNode.removeChild(i);
                ae(K().body, "htmx:oobErrorNoTarget", {
                    content: i
                })
            }
            return e
        }
        function xe(e, t, r) {
            var n = Y(e, "hx-select-oob");
            if (n) {
                var i = n.split(",");
                for (let e = 0; e < i.length; e++) {
                    var a = i[e].split(":", 2);
                    var o = a[0].trim();
                    if (o.indexOf("#") === 0) {
                        o = o.substring(1)
                    }
                    var s = a[1] || "true";
                    var l = t.querySelector("#" + o);
                    if (l) {
                        me(s, l, r)
                    }
                }
            }
            te(f(t, "[hx-swap-oob], [data-hx-swap-oob]"), function(e) {
                var t = Z(e, "hx-swap-oob");
                if (t != null) {
                    me(t, e, r)
                }
            })
        }
        function ye(e) {
            te(f(e, "[hx-preserve], [data-hx-preserve]"), function(e) {
                var t = Z(e, "id");
                var r = K().getElementById(t);
                if (r != null) {
                    e.parentNode.replaceChild(r, e)
                }
            })
        }
        function be(o, e, s) {
            te(e.querySelectorAll("[id]"), function(e) {
                var t = J(e, "id");
                if (t && t.length > 0) {
                    var r = t.replace("'", "\\'");
                    var n = e.tagName.replace(":", "\\:");
                    var i = o.querySelector(n + "[id='" + r + "']");
                    if (i && i !== o) {
                        var a = e.cloneNode();
                        ge(e, i);
                        s.tasks.push(function() {
                            ge(e, a)
                        })
                    }
                }
            })
        }
        function we(e) {
            return function() {
                n(e, G.config.addedClass);
                Nt(e);
                St(e);
                Se(e);
                oe(e, "htmx:load")
            }
        }
        function Se(e) {
            var t = "[autofocus]";
            var r = h(e, t) ? e : e.querySelector(t);
            if (r != null) {
                r.focus()
            }
        }
        function a(e, t, r, n) {
            be(e, r, n);
            while (r.childNodes.length > 0) {
                var i = r.firstChild;
                B(i, G.config.addedClass);
                e.insertBefore(i, t);
                if (i.nodeType !== Node.TEXT_NODE && i.nodeType !== Node.COMMENT_NODE) {
                    n.tasks.push(we(i))
                }
            }
        }
        function Ee(e, t) {
            var r = 0;
            while (r < e.length) {
                t = (t << 5) - t + e.charCodeAt(r++) | 0
            }
            return t
        }
        function Ce(e) {
            var t = 0;
            if (e.attributes) {
                for (var r = 0; r < e.attributes.length; r++) {
                    var n = e.attributes[r];
                    if (n.value) {
                        t = Ee(n.name, t);
                        t = Ee(n.value, t)
                    }
                }
            }
            return t
        }
        function Re(t) {
            var r = ee(t);
            if (r.onHandlers) {
                for (let e = 0; e < r.onHandlers.length; e++) {
                    const n = r.onHandlers[e];
                    t.removeEventListener(n.event, n.listener)
                }
                delete r.onHandlers
            }
        }
        function Oe(e) {
            var t = ee(e);
            if (t.timeout) {
                clearTimeout(t.timeout)
            }
            if (t.webSocket) {
                t.webSocket.close()
            }
            if (t.sseEventSource) {
                t.sseEventSource.close()
            }
            if (t.listenerInfos) {
                te(t.listenerInfos, function(e) {
                    if (e.on) {
                        e.on.removeEventListener(e.trigger, e.listener)
                    }
                })
            }
            if (t.initHash) {
                t.initHash = null
            }
            Re(e)
        }
        function g(e) {
            oe(e, "htmx:beforeCleanupElement");
            Oe(e);
            if (e.children) {
                te(e.children, function(e) {
                    g(e)
                })
            }
        }
        function Te(t, e, r) {
            if (t.tagName === "BODY") {
                return Ie(t, e, r)
            } else {
                var n;
                var i = t.previousSibling;
                a(u(t), t, e, r);
                if (i == null) {
                    n = u(t).firstChild
                } else {
                    n = i.nextSibling
                }
                ee(t).replacedWith = n;
                r.elts = r.elts.filter(function(e) {
                    return e != t
                });
                while (n && n !== t) {
                    if (n.nodeType === Node.ELEMENT_NODE) {
                        r.elts.push(n)
                    }
                    n = n.nextElementSibling
                }
                g(t);
                u(t).removeChild(t)
            }
        }
        function qe(e, t, r) {
            return a(e, e.firstChild, t, r)
        }
        function He(e, t, r) {
            return a(u(e), e, t, r)
        }
        function Le(e, t, r) {
            return a(e, null, t, r)
        }
        function Ae(e, t, r) {
            return a(u(e), e.nextSibling, t, r)
        }
        function Ne(e, t, r) {
            g(e);
            return u(e).removeChild(e)
        }
        function Ie(e, t, r) {
            var n = e.firstChild;
            a(e, n, t, r);
            if (n) {
                while (n.nextSibling) {
                    g(n.nextSibling);
                    e.removeChild(n.nextSibling)
                }
                g(n);
                e.removeChild(n)
            }
        }
        function ke(e, t, r) {
            var n = r || Y(e, "hx-select");
            if (n) {
                var i = K().createDocumentFragment();
                te(t.querySelectorAll(n), function(e) {
                    i.appendChild(e)
                });
                t = i
            }
            return t
        }
        function Pe(e, t, r, n, i) {
            switch (e) {
            case "none":
                return;
            case "outerHTML":
                Te(r, n, i);
                return;
            case "afterbegin":
                qe(r, n, i);
                return;
            case "beforebegin":
                He(r, n, i);
                return;
            case "beforeend":
                Le(r, n, i);
                return;
            case "afterend":
                Ae(r, n, i);
                return;
            case "delete":
                Ne(r, n, i);
                return;
            default:
                var a = Or(t);
                for (var o = 0; o < a.length; o++) {
                    var s = a[o];
                    try {
                        var l = s.handleSwap(e, r, n, i);
                        if (l) {
                            if (typeof l.length !== "undefined") {
                                for (var u = 0; u < l.length; u++) {
                                    var f = l[u];
                                    if (f.nodeType !== Node.TEXT_NODE && f.nodeType !== Node.COMMENT_NODE) {
                                        i.tasks.push(we(f))
                                    }
                                }
                            }
                            return
                        }
                    } catch (e) {
                        x(e)
                    }
                }
                if (e === "innerHTML") {
                    Ie(r, n, i)
                } else {
                    Pe(G.config.defaultSwapStyle, t, r, n, i)
                }
            }
        }
        function Me(e) {
            if (e.indexOf("<title") > -1) {
                var t = e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
                var r = t.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);
                if (r) {
                    return r[2]
                }
            }
        }
        function De(e, t, r, n, i, a) {
            i.title = Me(n);
            var o = l(n);
            if (o) {
                xe(r, o, i);
                o = ke(r, o, a);
                ye(o);
                return Pe(e, r, t, o, i)
            }
        }
        function Xe(e, t, r) {
            var n = e.getResponseHeader(t);
            if (n.indexOf("{") === 0) {
                var i = y(n);
                for (var a in i) {
                    if (i.hasOwnProperty(a)) {
                        var o = i[a];
                        if (!N(o)) {
                            o = {
                                value: o
                            }
                        }
                        oe(r, a, o)
                    }
                }
            } else {
                var s = n.split(",");
                for (var l = 0; l < s.length; l++) {
                    oe(r, s[l].trim(), [])
                }
            }
        }
        var Fe = /\s/;
        var p = /[\s,]/;
        var Ue = /[_$a-zA-Z]/;
        var Be = /[_$a-zA-Z0-9]/;
        var Ve = ['"', "'", "/"];
        var je = /[^\s]/;
        function We(e) {
            var t = [];
            var r = 0;
            while (r < e.length) {
                if (Ue.exec(e.charAt(r))) {
                    var n = r;
                    while (Be.exec(e.charAt(r + 1))) {
                        r++
                    }
                    t.push(e.substr(n, r - n + 1))
                } else if (Ve.indexOf(e.charAt(r)) !== -1) {
                    var i = e.charAt(r);
                    var n = r;
                    r++;
                    while (r < e.length && e.charAt(r) !== i) {
                        if (e.charAt(r) === "\\") {
                            r++
                        }
                        r++
                    }
                    t.push(e.substr(n, r - n + 1))
                } else {
                    var a = e.charAt(r);
                    t.push(a)
                }
                r++
            }
            return t
        }
        function _e(e, t, r) {
            return Ue.exec(e.charAt(0)) && e !== "true" && e !== "false" && e !== "this" && e !== r && t !== "."
        }
        function ze(e, t, r) {
            if (t[0] === "[") {
                t.shift();
                var n = 1;
                var i = " return (function(" + r + "){ return (";
                var a = null;
                while (t.length > 0) {
                    var o = t[0];
                    if (o === "]") {
                        n--;
                        if (n === 0) {
                            if (a === null) {
                                i = i + "true"
                            }
                            t.shift();
                            i += ")})";
                            try {
                                var s = hr(e, function() {
                                    return Function(i)()
                                }, function() {
                                    return true
                                });
                                s.source = i;
                                return s
                            } catch (e) {
                                ae(K().body, "htmx:syntax:error", {
                                    error: e,
                                    source: i
                                });
                                return null
                            }
                        }
                    } else if (o === "[") {
                        n++
                    }
                    if (_e(o, a, r)) {
                        i += "((" + r + "." + o + ") ? (" + r + "." + o + ") : (window." + o + "))"
                    } else {
                        i = i + o
                    }
                    a = t.shift()
                }
            }
        }
        function m(e, t) {
            var r = "";
            while (e.length > 0 && !e[0].match(t)) {
                r += e.shift()
            }
            return r
        }
        var $e = "input, textarea, select";
        function Ge(e) {
            var t = Z(e, "hx-trigger");
            var r = [];
            if (t) {
                var n = We(t);
                do {
                    m(n, je);
                    var i = n.length;
                    var a = m(n, /[,\[\s]/);
                    if (a !== "") {
                        if (a === "every") {
                            var o = {
                                trigger: "every"
                            };
                            m(n, je);
                            o.pollInterval = v(m(n, /[,\[\s]/));
                            m(n, je);
                            var s = ze(e, n, "event");
                            if (s) {
                                o.eventFilter = s
                            }
                            r.push(o)
                        } else if (a.indexOf("sse:") === 0) {
                            r.push({
                                trigger: "sse",
                                sseEvent: a.substr(4)
                            })
                        } else {
                            var l = {
                                trigger: a
                            };
                            var s = ze(e, n, "event");
                            if (s) {
                                l.eventFilter = s
                            }
                            while (n.length > 0 && n[0] !== ",") {
                                m(n, je);
                                var u = n.shift();
                                if (u === "changed") {
                                    l.changed = true
                                } else if (u === "once") {
                                    l.once = true
                                } else if (u === "consume") {
                                    l.consume = true
                                } else if (u === "delay" && n[0] === ":") {
                                    n.shift();
                                    l.delay = v(m(n, p))
                                } else if (u === "from" && n[0] === ":") {
                                    n.shift();
                                    var f = m(n, p);
                                    if (f === "closest" || f === "find" || f === "next" || f === "previous") {
                                        n.shift();
                                        f += " " + m(n, p)
                                    }
                                    l.from = f
                                } else if (u === "target" && n[0] === ":") {
                                    n.shift();
                                    l.target = m(n, p)
                                } else if (u === "throttle" && n[0] === ":") {
                                    n.shift();
                                    l.throttle = v(m(n, p))
                                } else if (u === "queue" && n[0] === ":") {
                                    n.shift();
                                    l.queue = m(n, p)
                                } else if ((u === "root" || u === "threshold") && n[0] === ":") {
                                    n.shift();
                                    l[u] = m(n, p)
                                } else {
                                    ae(e, "htmx:syntax:error", {
                                        token: n.shift()
                                    })
                                }
                            }
                            r.push(l)
                        }
                    }
                    if (n.length === i) {
                        ae(e, "htmx:syntax:error", {
                            token: n.shift()
                        })
                    }
                    m(n, je)
                } while (n[0] === "," && n.shift())
            }
            if (r.length > 0) {
                return r
            } else if (h(e, "form")) {
                return [{
                    trigger: "submit"
                }]
            } else if (h(e, 'input[type="button"], input[type="submit"]')) {
                return [{
                    trigger: "click"
                }]
            } else if (h(e, $e)) {
                return [{
                    trigger: "change"
                }]
            } else {
                return [{
                    trigger: "click"
                }]
            }
        }
        function Je(e) {
            ee(e).cancelled = true
        }
        function Ze(e, t, r) {
            var n = ee(e);
            n.timeout = setTimeout(function() {
                if (re(e) && n.cancelled !== true) {
                    if (!tt(r, e, kt("hx:poll:trigger", {
                        triggerSpec: r,
                        target: e
                    }))) {
                        t(e)
                    }
                    Ze(e, t, r)
                }
            }, r.pollInterval)
        }
        function Ke(e) {
            return location.hostname === e.hostname && J(e, "href") && J(e, "href").indexOf("#") !== 0
        }
        function Ye(t, r, e) {
            if (t.tagName === "A" && Ke(t) && (t.target === "" || t.target === "_self") || t.tagName === "FORM") {
                r.boosted = true;
                var n, i;
                if (t.tagName === "A") {
                    n = "get";
                    i = t.href
                } else {
                    var a = J(t, "method");
                    n = a ? a.toLowerCase() : "get";
                    if (n === "get") {}
                    i = J(t, "action")
                }
                e.forEach(function(e) {
                    rt(t, function(e, t) {
                        if (d(e, G.config.disableSelector)) {
                            g(e);
                            return
                        }
                        se(n, i, e, t)
                    }, r, e, true)
                })
            }
        }
        function Qe(e, t) {
            if (e.type === "submit" || e.type === "click") {
                if (t.tagName === "FORM") {
                    return true
                }
                if (h(t, 'input[type="submit"], button') && d(t, "form") !== null) {
                    return true
                }
                if (t.tagName === "A" && t.href && (t.getAttribute("href") === "#" || t.getAttribute("href").indexOf("#") !== 0)) {
                    return true
                }
            }
            return false
        }
        function et(e, t) {
            return ee(e).boosted && e.tagName === "A" && t.type === "click" && (t.ctrlKey || t.metaKey)
        }
        function tt(e, t, r) {
            var n = e.eventFilter;
            if (n) {
                try {
                    return n.call(t, r) !== true
                } catch (e) {
                    ae(K().body, "htmx:eventFilter:error", {
                        error: e,
                        source: n.source
                    });
                    return true
                }
            }
            return false
        }
        function rt(a, o, e, s, l) {
            var u = ee(a);
            var t;
            if (s.from) {
                t = W(a, s.from)
            } else {
                t = [a]
            }
            if (s.changed) {
                t.forEach(function(e) {
                    var t = ee(e);
                    t.lastValue = e.value
                })
            }
            te(t, function(n) {
                var i = function(e) {
                    if (!re(a)) {
                        n.removeEventListener(s.trigger, i);
                        return
                    }
                    if (et(a, e)) {
                        return
                    }
                    if (l || Qe(e, a)) {
                        e.preventDefault()
                    }
                    if (tt(s, a, e)) {
                        return
                    }
                    var t = ee(e);
                    t.triggerSpec = s;
                    if (t.handledFor == null) {
                        t.handledFor = []
                    }
                    if (t.handledFor.indexOf(a) < 0) {
                        t.handledFor.push(a);
                        if (s.consume) {
                            e.stopPropagation()
                        }
                        if (s.target && e.target) {
                            if (!h(e.target, s.target)) {
                                return
                            }
                        }
                        if (s.once) {
                            if (u.triggeredOnce) {
                                return
                            } else {
                                u.triggeredOnce = true
                            }
                        }
                        if (s.changed) {
                            var r = ee(n);
                            if (r.lastValue === n.value) {
                                return
                            }
                            r.lastValue = n.value
                        }
                        if (u.delayed) {
                            clearTimeout(u.delayed)
                        }
                        if (u.throttle) {
                            return
                        }
                        if (s.throttle) {
                            if (!u.throttle) {
                                o(a, e);
                                u.throttle = setTimeout(function() {
                                    u.throttle = null
                                }, s.throttle)
                            }
                        } else if (s.delay) {
                            u.delayed = setTimeout(function() {
                                o(a, e)
                            }, s.delay)
                        } else {
                            oe(a, "htmx:trigger");
                            o(a, e)
                        }
                    }
                };
                if (e.listenerInfos == null) {
                    e.listenerInfos = []
                }
                e.listenerInfos.push({
                    trigger: s.trigger,
                    listener: i,
                    on: n
                });
                n.addEventListener(s.trigger, i)
            })
        }
        var nt = false;
        var it = null;
        function at() {
            if (!it) {
                it = function() {
                    nt = true
                }
                ;
                window.addEventListener("scroll", it);
                setInterval(function() {
                    if (nt) {
                        nt = false;
                        te(K().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(e) {
                            ot(e)
                        })
                    }
                }, 200)
            }
        }
        function ot(t) {
            if (!o(t, "data-hx-revealed") && k(t)) {
                t.setAttribute("data-hx-revealed", "true");
                var e = ee(t);
                if (e.initHash) {
                    oe(t, "revealed")
                } else {
                    t.addEventListener("htmx:afterProcessNode", function(e) {
                        oe(t, "revealed")
                    }, {
                        once: true
                    })
                }
            }
        }
        function st(e, t, r) {
            var n = P(r);
            for (var i = 0; i < n.length; i++) {
                var a = n[i].split(/:(.+)/);
                if (a[0] === "connect") {
                    lt(e, a[1], 0)
                }
                if (a[0] === "send") {
                    ft(e)
                }
            }
        }
        function lt(s, r, n) {
            if (!re(s)) {
                return
            }
            if (r.indexOf("/") == 0) {
                var e = location.hostname + (location.port ? ":" + location.port : "");
                if (location.protocol == "https:") {
                    r = "wss://" + e + r
                } else if (location.protocol == "http:") {
                    r = "ws://" + e + r
                }
            }
            var t = G.createWebSocket(r);
            t.onerror = function(e) {
                ae(s, "htmx:wsError", {
                    error: e,
                    socket: t
                });
                ut(s)
            }
            ;
            t.onclose = function(e) {
                if ([1006, 1012, 1013].indexOf(e.code) >= 0) {
                    var t = ct(n);
                    setTimeout(function() {
                        lt(s, r, n + 1)
                    }, t)
                }
            }
            ;
            t.onopen = function(e) {
                n = 0
            }
            ;
            ee(s).webSocket = t;
            t.addEventListener("message", function(e) {
                if (ut(s)) {
                    return
                }
                var t = e.data;
                w(s, function(e) {
                    t = e.transformResponse(t, null, s)
                });
                var r = S(s);
                var n = l(t);
                var i = I(n.children);
                for (var a = 0; a < i.length; a++) {
                    var o = i[a];
                    me(Z(o, "hx-swap-oob") || "true", o, r)
                }
                Wt(r.tasks)
            })
        }
        function ut(e) {
            if (!re(e)) {
                ee(e).webSocket.close();
                return true
            }
        }
        function ft(u) {
            var f = c(u, function(e) {
                return ee(e).webSocket != null
            });
            if (f) {
                u.addEventListener(Ge(u)[0].trigger, function(e) {
                    var t = ee(f).webSocket;
                    var r = ir(u, f);
                    var n = er(u, "post");
                    var i = n.errors;
                    var a = n.values;
                    var o = gr(u);
                    var s = ne(a, o);
                    var l = ar(s, u);
                    l["HEADERS"] = r;
                    if (i && i.length > 0) {
                        oe(u, "htmx:validation:halted", i);
                        return
                    }
                    t.send(JSON.stringify(l));
                    if (Qe(e, u)) {
                        e.preventDefault()
                    }
                })
            } else {
                ae(u, "htmx:noWebSocketSourceError")
            }
        }
        function ct(e) {
            var t = G.config.wsReconnectDelay;
            if (typeof t === "function") {
                return t(e)
            }
            if (t === "full-jitter") {
                var r = Math.min(e, 6);
                var n = 1e3 * Math.pow(2, r);
                return n * Math.random()
            }
            x('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"')
        }
        function ht(e, t, r) {
            var n = P(r);
            for (var i = 0; i < n.length; i++) {
                var a = n[i].split(/:(.+)/);
                if (a[0] === "connect") {
                    dt(e, a[1])
                }
                if (a[0] === "swap") {
                    vt(e, a[1])
                }
            }
        }
        function dt(t, e) {
            var r = G.createEventSource(e);
            r.onerror = function(e) {
                ae(t, "htmx:sseError", {
                    error: e,
                    source: r
                });
                pt(t)
            }
            ;
            ee(t).sseEventSource = r
        }
        function vt(a, o) {
            var s = c(a, mt);
            if (s) {
                var l = ee(s).sseEventSource;
                var u = function(e) {
                    if (pt(s)) {
                        return
                    }
                    if (!re(a)) {
                        l.removeEventListener(o, u);
                        return
                    }
                    var t = e.data;
                    w(a, function(e) {
                        t = e.transformResponse(t, null, a)
                    });
                    var r = sr(a);
                    var n = de(a);
                    var i = S(a);
                    De(r.swapStyle, n, a, t, i);
                    Wt(i.tasks);
                    oe(a, "htmx:sseMessage", e)
                };
                ee(a).sseListener = u;
                l.addEventListener(o, u)
            } else {
                ae(a, "htmx:noSSESourceError")
            }
        }
        function gt(e, t, r) {
            var n = c(e, mt);
            if (n) {
                var i = ee(n).sseEventSource;
                var a = function() {
                    if (!pt(n)) {
                        if (re(e)) {
                            t(e)
                        } else {
                            i.removeEventListener(r, a)
                        }
                    }
                };
                ee(e).sseListener = a;
                i.addEventListener(r, a)
            } else {
                ae(e, "htmx:noSSESourceError")
            }
        }
        function pt(e) {
            if (!re(e)) {
                ee(e).sseEventSource.close();
                return true
            }
        }
        function mt(e) {
            return ee(e).sseEventSource != null
        }
        function xt(e, t, r, n) {
            var i = function() {
                if (!r.loaded) {
                    r.loaded = true;
                    t(e)
                }
            };
            if (n) {
                setTimeout(i, n)
            } else {
                i()
            }
        }
        function yt(t, i, e) {
            var a = false;
            te(R, function(r) {
                if (o(t, "hx-" + r)) {
                    var n = Z(t, "hx-" + r);
                    a = true;
                    i.path = n;
                    i.verb = r;
                    e.forEach(function(e) {
                        bt(t, e, i, function(e, t) {
                            if (d(e, G.config.disableSelector)) {
                                g(e);
                                return
                            }
                            se(r, n, e, t)
                        })
                    })
                }
            });
            return a
        }
        function bt(n, e, t, r) {
            if (e.sseEvent) {
                gt(n, r, e.sseEvent)
            } else if (e.trigger === "revealed") {
                at();
                rt(n, r, t, e);
                ot(n)
            } else if (e.trigger === "intersect") {
                var i = {};
                if (e.root) {
                    i.root = ie(n, e.root)
                }
                if (e.threshold) {
                    i.threshold = parseFloat(e.threshold)
                }
                var a = new IntersectionObserver(function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        if (r.isIntersecting) {
                            oe(n, "intersect");
                            break
                        }
                    }
                }
                ,i);
                a.observe(n);
                rt(n, r, t, e)
            } else if (e.trigger === "load") {
                if (!tt(e, n, kt("load", {
                    elt: n
                }))) {
                    xt(n, r, t, e.delay)
                }
            } else if (e.pollInterval) {
                t.polling = true;
                Ze(n, r, e)
            } else {
                rt(n, r, t, e)
            }
        }
        function wt(e) {
            if (e.type === "text/javascript" || e.type === "module" || e.type === "") {
                var t = K().createElement("script");
                te(e.attributes, function(e) {
                    t.setAttribute(e.name, e.value)
                });
                t.textContent = e.textContent;
                t.async = false;
                if (G.config.inlineScriptNonce) {
                    t.nonce = G.config.inlineScriptNonce
                }
                var r = e.parentElement;
                try {
                    r.insertBefore(t, e)
                } catch (e) {
                    x(e)
                } finally {
                    if (e.parentElement) {
                        e.parentElement.removeChild(e)
                    }
                }
            }
        }
        function St(e) {
            if (h(e, "script")) {
                wt(e)
            }
            te(f(e, "script"), function(e) {
                wt(e)
            })
        }
        function Et() {
            return document.querySelector("[hx-boost], [data-hx-boost]")
        }
        function Ct(e) {
            if (!document.evaluate)
                return [];
            let t = null;
            const r = [];
            const n = document.evaluate('//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") ]]', e);
            while (t = n.iterateNext())
                r.push(t);
            return r
        }
        function Rt(e) {
            if (e.querySelectorAll) {
                var t = Et() ? ", a" : "";
                var r = e.querySelectorAll(O + t + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws]," + " [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
                return r
            } else {
                return []
            }
        }
        function Ot(e) {
            var n = s("#" + J(e, "form")) || d(e, "form");
            if (!n) {
                return
            }
            var t = function(e) {
                var t = d(e.target, "button, input[type='submit']");
                if (t !== null) {
                    var r = ee(n);
                    r.lastButtonClicked = t
                }
            };
            e.addEventListener("click", t);
            e.addEventListener("focusin", t);
            e.addEventListener("focusout", function(e) {
                var t = ee(n);
                t.lastButtonClicked = null
            })
        }
        function Tt(e) {
            var t = We(e);
            var r = 0;
            for (let e = 0; e < t.length; e++) {
                const n = t[e];
                if (n === "{") {
                    r++
                } else if (n === "}") {
                    r--
                }
            }
            return r
        }
        function qt(t, e, r) {
            var n = ee(t);
            n.onHandlers = [];
            var i = new Function("event",r + "; return;");
            var a = function(e) {
                return i.call(t, e)
            };
            t.addEventListener(e, a);
            n.onHandlers.push({
                event: e,
                listener: a
            });
            return {
                nodeData: n,
                code: r,
                func: i,
                listener: a
            }
        }
        function Ht(e) {
            var t = Z(e, "hx-on");
            if (t && G.config.allowEval) {
                var r = {};
                var n = t.split("\n");
                var i = null;
                var a = 0;
                while (n.length > 0) {
                    var o = n.shift();
                    var s = o.match(/^\s*([a-zA-Z:\-]+:)(.*)/);
                    if (a === 0 && s) {
                        o.split(":");
                        i = s[1].slice(0, -1);
                        r[i] = s[2]
                    } else {
                        r[i] += o
                    }
                    a += Tt(o)
                }
                for (var l in r) {
                    qt(e, l, r[l])
                }
            }
        }
        function Lt(t) {
            Re(t);
            for (var e = 0; e < t.attributes.length; e++) {
                var r = t.attributes[e].name;
                var n = t.attributes[e].value;
                if (r.startsWith("hx-on:") || r.startsWith("data-hx-on:")) {
                    let e = r.slice(r.indexOf(":") + 1);
                    if (e.startsWith(":"))
                        e = "htmx" + e;
                    qt(t, e, n)
                }
            }
        }
        function At(t) {
            if (d(t, G.config.disableSelector)) {
                g(t);
                return
            }
            var r = ee(t);
            if (r.initHash !== Ce(t)) {
                Oe(t);
                r.initHash = Ce(t);
                Ht(t);
                oe(t, "htmx:beforeProcessNode");
                if (t.value) {
                    r.lastValue = t.value
                }
                var e = Ge(t);
                var n = yt(t, r, e);
                if (!n) {
                    if (Y(t, "hx-boost") === "true") {
                        Ye(t, r, e)
                    } else if (o(t, "hx-trigger")) {
                        e.forEach(function(e) {
                            bt(t, e, r, function() {})
                        })
                    }
                }
                if (t.tagName === "FORM" || J(t, "type") === "submit" && o(t, "form")) {
                    Ot(t)
                }
                var i = Z(t, "hx-sse");
                if (i) {
                    ht(t, r, i)
                }
                var a = Z(t, "hx-ws");
                if (a) {
                    st(t, r, a)
                }
                oe(t, "htmx:afterProcessNode")
            }
        }
        function Nt(e) {
            e = s(e);
            if (d(e, G.config.disableSelector)) {
                g(e);
                return
            }
            At(e);
            te(Rt(e), function(e) {
                At(e)
            });
            te(Ct(e), Lt)
        }
        function It(e) {
            return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
        }
        function kt(e, t) {
            var r;
            if (window.CustomEvent && typeof window.CustomEvent === "function") {
                r = new CustomEvent(e,{
                    bubbles: true,
                    cancelable: true,
                    detail: t
                })
            } else {
                r = K().createEvent("CustomEvent");
                r.initCustomEvent(e, true, true, t)
            }
            return r
        }
        function ae(e, t, r) {
            oe(e, t, ne({
                error: t
            }, r))
        }
        function Pt(e) {
            return e === "htmx:afterProcessNode"
        }
        function w(e, t) {
            te(Or(e), function(e) {
                try {
                    t(e)
                } catch (e) {
                    x(e)
                }
            })
        }
        function x(e) {
            if (console.error) {
                console.error(e)
            } else if (console.log) {
                console.log("ERROR: ", e)
            }
        }
        function oe(e, t, r) {
            e = s(e);
            if (r == null) {
                r = {}
            }
            r["elt"] = e;
            var n = kt(t, r);
            if (G.logger && !Pt(t)) {
                G.logger(e, t, r)
            }
            if (r.error) {
                x(r.error);
                oe(e, "htmx:error", {
                    errorInfo: r
                })
            }
            var i = e.dispatchEvent(n);
            var a = It(t);
            if (i && a !== t) {
                var o = kt(a, n.detail);
                i = i && e.dispatchEvent(o)
            }
            w(e, function(e) {
                i = i && e.onEvent(t, n) !== false
            });
            return i
        }
        var Mt = location.pathname + location.search;
        function Dt() {
            var e = K().querySelector("[hx-history-elt],[data-hx-history-elt]");
            return e || K().body
        }
        function Xt(e, t, r, n) {
            if (!M()) {
                return
            }
            e = D(e);
            var i = y(localStorage.getItem("htmx-history-cache")) || [];
            for (var a = 0; a < i.length; a++) {
                if (i[a].url === e) {
                    i.splice(a, 1);
                    break
                }
            }
            var o = {
                url: e,
                content: t,
                title: r,
                scroll: n
            };
            oe(K().body, "htmx:historyItemCreated", {
                item: o,
                cache: i
            });
            i.push(o);
            while (i.length > G.config.historyCacheSize) {
                i.shift()
            }
            while (i.length > 0) {
                try {
                    localStorage.setItem("htmx-history-cache", JSON.stringify(i));
                    break
                } catch (e) {
                    ae(K().body, "htmx:historyCacheError", {
                        cause: e,
                        cache: i
                    });
                    i.shift()
                }
            }
        }
        function Ft(e) {
            if (!M()) {
                return null
            }
            e = D(e);
            var t = y(localStorage.getItem("htmx-history-cache")) || [];
            for (var r = 0; r < t.length; r++) {
                if (t[r].url === e) {
                    return t[r]
                }
            }
            return null
        }
        function Ut(e) {
            var t = G.config.requestClass;
            var r = e.cloneNode(true);
            te(f(r, "." + t), function(e) {
                n(e, t)
            });
            return r.innerHTML
        }
        function Bt() {
            var e = Dt();
            var t = Mt || location.pathname + location.search;
            var r = K().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
            if (!r) {
                oe(K().body, "htmx:beforeHistorySave", {
                    path: t,
                    historyElt: e
                });
                Xt(t, Ut(e), K().title, window.scrollY)
            }
            if (G.config.historyEnabled)
                history.replaceState({
                    htmx: true
                }, K().title, window.location.href)
        }
        function Vt(e) {
            if (G.config.getCacheBusterParam) {
                e = e.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
                if (e.endsWith("&") || e.endsWith("?")) {
                    e = e.slice(0, -1)
                }
            }
            if (G.config.historyEnabled) {
                history.pushState({
                    htmx: true
                }, "", e)
            }
            Mt = e
        }
        function jt(e) {
            if (G.config.historyEnabled)
                history.replaceState({
                    htmx: true
                }, "", e);
            Mt = e
        }
        function Wt(e) {
            te(e, function(e) {
                e.call()
            })
        }
        function _t(a) {
            var e = new XMLHttpRequest;
            var o = {
                path: a,
                xhr: e
            };
            oe(K().body, "htmx:historyCacheMiss", o);
            e.open("GET", a, true);
            e.setRequestHeader("HX-History-Restore-Request", "true");
            e.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    oe(K().body, "htmx:historyCacheMissLoad", o);
                    var e = l(this.response);
                    e = e.querySelector("[hx-history-elt],[data-hx-history-elt]") || e;
                    var t = Dt();
                    var r = S(t);
                    var n = Me(this.response);
                    if (n) {
                        var i = b("title");
                        if (i) {
                            i.innerHTML = n
                        } else {
                            window.document.title = n
                        }
                    }
                    Ie(t, e, r);
                    Wt(r.tasks);
                    Mt = a;
                    oe(K().body, "htmx:historyRestore", {
                        path: a,
                        cacheMiss: true,
                        serverResponse: this.response
                    })
                } else {
                    ae(K().body, "htmx:historyCacheMissLoadError", o)
                }
            }
            ;
            e.send()
        }
        function zt(e) {
            Bt();
            e = e || location.pathname + location.search;
            var t = Ft(e);
            if (t) {
                var r = l(t.content);
                var n = Dt();
                var i = S(n);
                Ie(n, r, i);
                Wt(i.tasks);
                document.title = t.title;
                setTimeout(function() {
                    window.scrollTo(0, t.scroll)
                }, 0);
                Mt = e;
                oe(K().body, "htmx:historyRestore", {
                    path: e,
                    item: t
                })
            } else {
                if (G.config.refreshOnHistoryMiss) {
                    window.location.reload(true)
                } else {
                    _t(e)
                }
            }
        }
        function $t(e) {
            var t = ce(e, "hx-indicator");
            if (t == null) {
                t = [e]
            }
            te(t, function(e) {
                var t = ee(e);
                t.requestCount = (t.requestCount || 0) + 1;
                e.classList["add"].call(e.classList, G.config.requestClass)
            });
            return t
        }
        function Gt(e) {
            te(e, function(e) {
                var t = ee(e);
                t.requestCount = (t.requestCount || 0) - 1;
                if (t.requestCount === 0) {
                    e.classList["remove"].call(e.classList, G.config.requestClass)
                }
            })
        }
        function Jt(e, t) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                if (n.isSameNode(t)) {
                    return true
                }
            }
            return false
        }
        function Zt(e) {
            if (e.name === "" || e.name == null || e.disabled) {
                return false
            }
            if (e.type === "button" || e.type === "submit" || e.tagName === "image" || e.tagName === "reset" || e.tagName === "file") {
                return false
            }
            if (e.type === "checkbox" || e.type === "radio") {
                return e.checked
            }
            return true
        }
        function Kt(e, t, r) {
            if (e != null && t != null) {
                var n = r[e];
                if (n === undefined) {
                    r[e] = t
                } else if (Array.isArray(n)) {
                    if (Array.isArray(t)) {
                        r[e] = n.concat(t)
                    } else {
                        n.push(t)
                    }
                } else {
                    if (Array.isArray(t)) {
                        r[e] = [n].concat(t)
                    } else {
                        r[e] = [n, t]
                    }
                }
            }
        }
        function Yt(t, r, n, e, i) {
            if (e == null || Jt(t, e)) {
                return
            } else {
                t.push(e)
            }
            if (Zt(e)) {
                var a = J(e, "name");
                var o = e.value;
                if (e.multiple) {
                    o = I(e.querySelectorAll("option:checked")).map(function(e) {
                        return e.value
                    })
                }
                if (e.files) {
                    o = I(e.files)
                }
                Kt(a, o, r);
                if (i) {
                    Qt(e, n)
                }
            }
            if (h(e, "form")) {
                var s = e.elements;
                te(s, function(e) {
                    Yt(t, r, n, e, i)
                })
            }
        }
        function Qt(e, t) {
            if (e.willValidate) {
                oe(e, "htmx:validation:validate");
                if (!e.checkValidity()) {
                    t.push({
                        elt: e,
                        message: e.validationMessage,
                        validity: e.validity
                    });
                    oe(e, "htmx:validation:failed", {
                        message: e.validationMessage,
                        validity: e.validity
                    })
                }
            }
        }
        function er(e, t) {
            var r = [];
            var n = {};
            var i = {};
            var a = [];
            var o = ee(e);
            var s = h(e, "form") && e.noValidate !== true || Z(e, "hx-validate") === "true";
            if (o.lastButtonClicked) {
                s = s && o.lastButtonClicked.formNoValidate !== true
            }
            if (t !== "get") {
                Yt(r, i, a, d(e, "form"), s)
            }
            Yt(r, n, a, e, s);
            if (o.lastButtonClicked || e.tagName === "BUTTON" || e.tagName === "INPUT" && J(e, "type") === "submit") {
                var l = o.lastButtonClicked || e;
                var u = J(l, "name");
                Kt(u, l.value, i)
            }
            var f = ce(e, "hx-include");
            te(f, function(e) {
                Yt(r, n, a, e, s);
                if (!h(e, "form")) {
                    te(e.querySelectorAll($e), function(e) {
                        Yt(r, n, a, e, s)
                    })
                }
            });
            n = ne(n, i);
            return {
                errors: a,
                values: n
            }
        }
        function tr(e, t, r) {
            if (e !== "") {
                e += "&"
            }
            if (String(r) === "[object Object]") {
                r = JSON.stringify(r)
            }
            var n = encodeURIComponent(r);
            e += encodeURIComponent(t) + "=" + n;
            return e
        }
        function rr(e) {
            var t = "";
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    var n = e[r];
                    if (Array.isArray(n)) {
                        te(n, function(e) {
                            t = tr(t, r, e)
                        })
                    } else {
                        t = tr(t, r, n)
                    }
                }
            }
            return t
        }
        function nr(e) {
            var t = new FormData;
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    var n = e[r];
                    if (Array.isArray(n)) {
                        te(n, function(e) {
                            t.append(r, e)
                        })
                    } else {
                        t.append(r, n)
                    }
                }
            }
            return t
        }
        function ir(e, t, r) {
            var n = {
                "HX-Request": "true",
                "HX-Trigger": J(e, "id"),
                "HX-Trigger-Name": J(e, "name"),
                "HX-Target": Z(t, "id"),
                "HX-Current-URL": K().location.href
            };
            cr(e, "hx-headers", false, n);
            if (r !== undefined) {
                n["HX-Prompt"] = r
            }
            if (ee(e).boosted) {
                n["HX-Boosted"] = "true"
            }
            return n
        }
        function ar(t, e) {
            var r = Y(e, "hx-params");
            if (r) {
                if (r === "none") {
                    return {}
                } else if (r === "*") {
                    return t
                } else if (r.indexOf("not ") === 0) {
                    te(r.substr(4).split(","), function(e) {
                        e = e.trim();
                        delete t[e]
                    });
                    return t
                } else {
                    var n = {};
                    te(r.split(","), function(e) {
                        e = e.trim();
                        n[e] = t[e]
                    });
                    return n
                }
            } else {
                return t
            }
        }
        function or(e) {
            return J(e, "href") && J(e, "href").indexOf("#") >= 0
        }
        function sr(e, t) {
            var r = t ? t : Y(e, "hx-swap");
            var n = {
                swapStyle: ee(e).boosted ? "innerHTML" : G.config.defaultSwapStyle,
                swapDelay: G.config.defaultSwapDelay,
                settleDelay: G.config.defaultSettleDelay
            };
            if (ee(e).boosted && !or(e)) {
                n["show"] = "top"
            }
            if (r) {
                var i = P(r);
                if (i.length > 0) {
                    n["swapStyle"] = i[0];
                    for (var a = 1; a < i.length; a++) {
                        var o = i[a];
                        if (o.indexOf("swap:") === 0) {
                            n["swapDelay"] = v(o.substr(5))
                        }
                        if (o.indexOf("settle:") === 0) {
                            n["settleDelay"] = v(o.substr(7))
                        }
                        if (o.indexOf("transition:") === 0) {
                            n["transition"] = o.substr(11) === "true"
                        }
                        if (o.indexOf("scroll:") === 0) {
                            var s = o.substr(7);
                            var l = s.split(":");
                            var u = l.pop();
                            var f = l.length > 0 ? l.join(":") : null;
                            n["scroll"] = u;
                            n["scrollTarget"] = f
                        }
                        if (o.indexOf("show:") === 0) {
                            var c = o.substr(5);
                            var l = c.split(":");
                            var h = l.pop();
                            var f = l.length > 0 ? l.join(":") : null;
                            n["show"] = h;
                            n["showTarget"] = f
                        }
                        if (o.indexOf("focus-scroll:") === 0) {
                            var d = o.substr("focus-scroll:".length);
                            n["focusScroll"] = d == "true"
                        }
                    }
                }
            }
            return n
        }
        function lr(e) {
            return Y(e, "hx-encoding") === "multipart/form-data" || h(e, "form") && J(e, "enctype") === "multipart/form-data"
        }
        function ur(t, r, n) {
            var i = null;
            w(r, function(e) {
                if (i == null) {
                    i = e.encodeParameters(t, n, r)
                }
            });
            if (i != null) {
                return i
            } else {
                if (lr(r)) {
                    return nr(n)
                } else {
                    return rr(n)
                }
            }
        }
        function S(e) {
            return {
                tasks: [],
                elts: [e]
            }
        }
        function fr(e, t) {
            var r = e[0];
            var n = e[e.length - 1];
            if (t.scroll) {
                var i = null;
                if (t.scrollTarget) {
                    i = ie(r, t.scrollTarget)
                }
                if (t.scroll === "top" && (r || i)) {
                    i = i || r;
                    i.scrollTop = 0
                }
                if (t.scroll === "bottom" && (n || i)) {
                    i = i || n;
                    i.scrollTop = i.scrollHeight
                }
            }
            if (t.show) {
                var i = null;
                if (t.showTarget) {
                    var a = t.showTarget;
                    if (t.showTarget === "window") {
                        a = "body"
                    }
                    i = ie(r, a)
                }
                if (t.show === "top" && (r || i)) {
                    i = i || r;
                    i.scrollIntoView({
                        block: "start",
                        behavior: G.config.scrollBehavior
                    })
                }
                if (t.show === "bottom" && (n || i)) {
                    i = i || n;
                    i.scrollIntoView({
                        block: "end",
                        behavior: G.config.scrollBehavior
                    })
                }
            }
        }
        function cr(e, t, r, n) {
            if (n == null) {
                n = {}
            }
            if (e == null) {
                return n
            }
            var i = Z(e, t);
            if (i) {
                var a = i.trim();
                var o = r;
                if (a === "unset") {
                    return null
                }
                if (a.indexOf("javascript:") === 0) {
                    a = a.substr(11);
                    o = true
                } else if (a.indexOf("js:") === 0) {
                    a = a.substr(3);
                    o = true
                }
                if (a.indexOf("{") !== 0) {
                    a = "{" + a + "}"
                }
                var s;
                if (o) {
                    s = hr(e, function() {
                        return Function("return (" + a + ")")()
                    }, {})
                } else {
                    s = y(a)
                }
                for (var l in s) {
                    if (s.hasOwnProperty(l)) {
                        if (n[l] == null) {
                            n[l] = s[l]
                        }
                    }
                }
            }
            return cr(u(e), t, r, n)
        }
        function hr(e, t, r) {
            if (G.config.allowEval) {
                return t()
            } else {
                ae(e, "htmx:evalDisallowedError");
                return r
            }
        }
        function dr(e, t) {
            return cr(e, "hx-vars", true, t)
        }
        function vr(e, t) {
            return cr(e, "hx-vals", false, t)
        }
        function gr(e) {
            return ne(dr(e), vr(e))
        }
        function pr(t, r, n) {
            if (n !== null) {
                try {
                    t.setRequestHeader(r, n)
                } catch (e) {
                    t.setRequestHeader(r, encodeURIComponent(n));
                    t.setRequestHeader(r + "-URI-AutoEncoded", "true")
                }
            }
        }
        function mr(t) {
            if (t.responseURL && typeof URL !== "undefined") {
                try {
                    var e = new URL(t.responseURL);
                    return e.pathname + e.search
                } catch (e) {
                    ae(K().body, "htmx:badResponseUrl", {
                        url: t.responseURL
                    })
                }
            }
        }
        function E(e, t) {
            return e.getAllResponseHeaders().match(t)
        }
        function xr(e, t, r) {
            e = e.toLowerCase();
            if (r) {
                if (r instanceof Element || L(r, "String")) {
                    return se(e, t, null, null, {
                        targetOverride: s(r),
                        returnPromise: true
                    })
                } else {
                    return se(e, t, s(r.source), r.event, {
                        handler: r.handler,
                        headers: r.headers,
                        values: r.values,
                        targetOverride: s(r.target),
                        swapOverride: r.swap,
                        returnPromise: true
                    })
                }
            } else {
                return se(e, t, null, null, {
                    returnPromise: true
                })
            }
        }
        function yr(e) {
            var t = [];
            while (e) {
                t.push(e);
                e = e.parentElement
            }
            return t
        }
        function se(e, t, n, r, i, M) {
            var a = null;
            var o = null;
            i = i != null ? i : {};
            if (i.returnPromise && typeof Promise !== "undefined") {
                var s = new Promise(function(e, t) {
                    a = e;
                    o = t
                }
                )
            }
            if (n == null) {
                n = K().body
            }
            var D = i.handler || wr;
            if (!re(n)) {
                return
            }
            var l = i.targetOverride || de(n);
            if (l == null || l == fe) {
                ae(n, "htmx:targetError", {
                    target: Z(n, "hx-target")
                });
                return
            }
            if (!M) {
                var X = function() {
                    return se(e, t, n, r, i, true)
                };
                var F = {
                    target: l,
                    elt: n,
                    path: t,
                    verb: e,
                    triggeringEvent: r,
                    etc: i,
                    issueRequest: X
                };
                if (oe(n, "htmx:confirm", F) === false) {
                    return
                }
            }
            var u = n;
            var f = ee(n);
            var c = Y(n, "hx-sync");
            var h = null;
            var d = false;
            if (c) {
                var v = c.split(":");
                var g = v[0].trim();
                if (g === "this") {
                    u = he(n, "hx-sync")
                } else {
                    u = ie(n, g)
                }
                c = (v[1] || "drop").trim();
                f = ee(u);
                if (c === "drop" && f.xhr && f.abortable !== true) {
                    return
                } else if (c === "abort") {
                    if (f.xhr) {
                        return
                    } else {
                        d = true
                    }
                } else if (c === "replace") {
                    oe(u, "htmx:abort")
                } else if (c.indexOf("queue") === 0) {
                    var U = c.split(" ");
                    h = (U[1] || "last").trim()
                }
            }
            if (f.xhr) {
                if (f.abortable) {
                    oe(u, "htmx:abort")
                } else {
                    if (h == null) {
                        if (r) {
                            var p = ee(r);
                            if (p && p.triggerSpec && p.triggerSpec.queue) {
                                h = p.triggerSpec.queue
                            }
                        }
                        if (h == null) {
                            h = "last"
                        }
                    }
                    if (f.queuedRequests == null) {
                        f.queuedRequests = []
                    }
                    if (h === "first" && f.queuedRequests.length === 0) {
                        f.queuedRequests.push(function() {
                            se(e, t, n, r, i)
                        })
                    } else if (h === "all") {
                        f.queuedRequests.push(function() {
                            se(e, t, n, r, i)
                        })
                    } else if (h === "last") {
                        f.queuedRequests = [];
                        f.queuedRequests.push(function() {
                            se(e, t, n, r, i)
                        })
                    }
                    return
                }
            }
            var m = new XMLHttpRequest;
            f.xhr = m;
            f.abortable = d;
            var x = function() {
                f.xhr = null;
                f.abortable = false;
                if (f.queuedRequests != null && f.queuedRequests.length > 0) {
                    var e = f.queuedRequests.shift();
                    e()
                }
            };
            var y = Y(n, "hx-prompt");
            if (y) {
                var b = prompt(y);
                if (b === null || !oe(n, "htmx:prompt", {
                    prompt: b,
                    target: l
                })) {
                    Q(a);
                    x();
                    return s
                }
            }
            var w = Y(n, "hx-confirm");
            if (w) {
                if (!confirm(w)) {
                    Q(a);
                    x();
                    return s
                }
            }
            var S = ir(n, l, b);
            if (i.headers) {
                S = ne(S, i.headers)
            }
            var E = er(n, e);
            var C = E.errors;
            var R = E.values;
            if (i.values) {
                R = ne(R, i.values)
            }
            var B = gr(n);
            var O = ne(R, B);
            var T = ar(O, n);
            if (e !== "get" && !lr(n)) {
                S["Content-Type"] = "application/x-www-form-urlencoded"
            }
            if (G.config.getCacheBusterParam && e === "get") {
                T["org.htmx.cache-buster"] = J(l, "id") || "true"
            }
            if (t == null || t === "") {
                t = K().location.href
            }
            var q = cr(n, "hx-request");
            var V = ee(n).boosted;
            var H = G.config.methodsThatUseUrlParams.indexOf(e) >= 0;
            var L = {
                boosted: V,
                useUrlParams: H,
                parameters: T,
                unfilteredParameters: O,
                headers: S,
                target: l,
                verb: e,
                errors: C,
                withCredentials: i.credentials || q.credentials || G.config.withCredentials,
                timeout: i.timeout || q.timeout || G.config.timeout,
                path: t,
                triggeringEvent: r
            };
            if (!oe(n, "htmx:configRequest", L)) {
                Q(a);
                x();
                return s
            }
            t = L.path;
            e = L.verb;
            S = L.headers;
            T = L.parameters;
            C = L.errors;
            H = L.useUrlParams;
            if (C && C.length > 0) {
                oe(n, "htmx:validation:halted", L);
                Q(a);
                x();
                return s
            }
            var j = t.split("#");
            var W = j[0];
            var A = j[1];
            var N = t;
            if (H) {
                N = W;
                var _ = Object.keys(T).length !== 0;
                if (_) {
                    if (N.indexOf("?") < 0) {
                        N += "?"
                    } else {
                        N += "&"
                    }
                    N += rr(T);
                    if (A) {
                        N += "#" + A
                    }
                }
            }
            m.open(e.toUpperCase(), N, true);
            m.overrideMimeType("text/html");
            m.withCredentials = L.withCredentials;
            m.timeout = L.timeout;
            if (q.noHeaders) {} else {
                for (var I in S) {
                    if (S.hasOwnProperty(I)) {
                        var z = S[I];
                        pr(m, I, z)
                    }
                }
            }
            var k = {
                xhr: m,
                target: l,
                requestConfig: L,
                etc: i,
                boosted: V,
                pathInfo: {
                    requestPath: t,
                    finalRequestPath: N,
                    anchor: A
                }
            };
            m.onload = function() {
                try {
                    var e = yr(n);
                    k.pathInfo.responsePath = mr(m);
                    D(n, k);
                    Gt(P);
                    oe(n, "htmx:afterRequest", k);
                    oe(n, "htmx:afterOnLoad", k);
                    if (!re(n)) {
                        var t = null;
                        while (e.length > 0 && t == null) {
                            var r = e.shift();
                            if (re(r)) {
                                t = r
                            }
                        }
                        if (t) {
                            oe(t, "htmx:afterRequest", k);
                            oe(t, "htmx:afterOnLoad", k)
                        }
                    }
                    Q(a);
                    x()
                } catch (e) {
                    ae(n, "htmx:onLoadError", ne({
                        error: e
                    }, k));
                    throw e
                }
            }
            ;
            m.onerror = function() {
                Gt(P);
                ae(n, "htmx:afterRequest", k);
                ae(n, "htmx:sendError", k);
                Q(o);
                x()
            }
            ;
            m.onabort = function() {
                Gt(P);
                ae(n, "htmx:afterRequest", k);
                ae(n, "htmx:sendAbort", k);
                Q(o);
                x()
            }
            ;
            m.ontimeout = function() {
                Gt(P);
                ae(n, "htmx:afterRequest", k);
                ae(n, "htmx:timeout", k);
                Q(o);
                x()
            }
            ;
            if (!oe(n, "htmx:beforeRequest", k)) {
                Q(a);
                x();
                return s
            }
            var P = $t(n);
            te(["loadstart", "loadend", "progress", "abort"], function(t) {
                te([m, m.upload], function(e) {
                    e.addEventListener(t, function(e) {
                        oe(n, "htmx:xhr:" + t, {
                            lengthComputable: e.lengthComputable,
                            loaded: e.loaded,
                            total: e.total
                        })
                    })
                })
            });
            oe(n, "htmx:beforeSend", k);
            var $ = H ? null : ur(m, n, T);
            m.send($);
            return s
        }
        function br(e, t) {
            var r = t.xhr;
            var n = null;
            var i = null;
            if (E(r, /HX-Push:/i)) {
                n = r.getResponseHeader("HX-Push");
                i = "push"
            } else if (E(r, /HX-Push-Url:/i)) {
                n = r.getResponseHeader("HX-Push-Url");
                i = "push"
            } else if (E(r, /HX-Replace-Url:/i)) {
                n = r.getResponseHeader("HX-Replace-Url");
                i = "replace"
            }
            if (n) {
                if (n === "false") {
                    return {}
                } else {
                    return {
                        type: i,
                        path: n
                    }
                }
            }
            var a = t.pathInfo.finalRequestPath;
            var o = t.pathInfo.responsePath;
            var s = Y(e, "hx-push-url");
            var l = Y(e, "hx-replace-url");
            var u = ee(e).boosted;
            var f = null;
            var c = null;
            if (s) {
                f = "push";
                c = s
            } else if (l) {
                f = "replace";
                c = l
            } else if (u) {
                f = "push";
                c = o || a
            }
            if (c) {
                if (c === "false") {
                    return {}
                }
                if (c === "true") {
                    c = o || a
                }
                if (t.pathInfo.anchor && c.indexOf("#") === -1) {
                    c = c + "#" + t.pathInfo.anchor
                }
                return {
                    type: f,
                    path: c
                }
            } else {
                return {}
            }
        }
        function wr(l, u) {
            var f = u.xhr;
            var c = u.target;
            var e = u.etc;
            if (!oe(l, "htmx:beforeOnLoad", u))
                return;
            if (E(f, /HX-Trigger:/i)) {
                Xe(f, "HX-Trigger", l)
            }
            if (E(f, /HX-Location:/i)) {
                Bt();
                var t = f.getResponseHeader("HX-Location");
                var h;
                if (t.indexOf("{") === 0) {
                    h = y(t);
                    t = h["path"];
                    delete h["path"]
                }
                xr("GET", t, h).then(function() {
                    Vt(t)
                });
                return
            }
            if (E(f, /HX-Redirect:/i)) {
                location.href = f.getResponseHeader("HX-Redirect");
                return
            }
            if (E(f, /HX-Refresh:/i)) {
                if ("true" === f.getResponseHeader("HX-Refresh")) {
                    location.reload();
                    return
                }
            }
            if (E(f, /HX-Retarget:/i)) {
                u.target = K().querySelector(f.getResponseHeader("HX-Retarget"))
            }
            var d = br(l, u);
            var r = f.status >= 200 && f.status < 400 && f.status !== 204;
            var v = f.response;
            var n = f.status >= 400;
            var i = ne({
                shouldSwap: r,
                serverResponse: v,
                isError: n
            }, u);
            if (!oe(c, "htmx:beforeSwap", i))
                return;
            c = i.target;
            v = i.serverResponse;
            n = i.isError;
            u.target = c;
            u.failed = n;
            u.successful = !n;
            if (i.shouldSwap) {
                if (f.status === 286) {
                    Je(l)
                }
                w(l, function(e) {
                    v = e.transformResponse(v, f, l)
                });
                if (d.type) {
                    Bt()
                }
                var a = e.swapOverride;
                if (E(f, /HX-Reswap:/i)) {
                    a = f.getResponseHeader("HX-Reswap")
                }
                var h = sr(l, a);
                c.classList.add(G.config.swappingClass);
                var g = null;
                var p = null;
                var o = function() {
                    try {
                        var e = document.activeElement;
                        var t = {};
                        try {
                            t = {
                                elt: e,
                                start: e ? e.selectionStart : null,
                                end: e ? e.selectionEnd : null
                            }
                        } catch (e) {}
                        var r;
                        if (E(f, /HX-Reselect:/i)) {
                            r = f.getResponseHeader("HX-Reselect")
                        }
                        var n = S(c);
                        De(h.swapStyle, c, l, v, n, r);
                        if (t.elt && !re(t.elt) && J(t.elt, "id")) {
                            var i = document.getElementById(J(t.elt, "id"));
                            var a = {
                                preventScroll: h.focusScroll !== undefined ? !h.focusScroll : !G.config.defaultFocusScroll
                            };
                            if (i) {
                                if (t.start && i.setSelectionRange) {
                                    try {
                                        i.setSelectionRange(t.start, t.end)
                                    } catch (e) {}
                                }
                                i.focus(a)
                            }
                        }
                        c.classList.remove(G.config.swappingClass);
                        te(n.elts, function(e) {
                            if (e.classList) {
                                e.classList.add(G.config.settlingClass)
                            }
                            oe(e, "htmx:afterSwap", u)
                        });
                        if (E(f, /HX-Trigger-After-Swap:/i)) {
                            var o = l;
                            if (!re(l)) {
                                o = K().body
                            }
                            Xe(f, "HX-Trigger-After-Swap", o)
                        }
                        var s = function() {
                            te(n.tasks, function(e) {
                                e.call()
                            });
                            te(n.elts, function(e) {
                                if (e.classList) {
                                    e.classList.remove(G.config.settlingClass)
                                }
                                oe(e, "htmx:afterSettle", u)
                            });
                            if (d.type) {
                                if (d.type === "push") {
                                    Vt(d.path);
                                    oe(K().body, "htmx:pushedIntoHistory", {
                                        path: d.path
                                    })
                                } else {
                                    jt(d.path);
                                    oe(K().body, "htmx:replacedInHistory", {
                                        path: d.path
                                    })
                                }
                            }
                            if (u.pathInfo.anchor) {
                                var e = b("#" + u.pathInfo.anchor);
                                if (e) {
                                    e.scrollIntoView({
                                        block: "start",
                                        behavior: "auto"
                                    })
                                }
                            }
                            if (n.title) {
                                var t = b("title");
                                if (t) {
                                    t.innerHTML = n.title
                                } else {
                                    window.document.title = n.title
                                }
                            }
                            fr(n.elts, h);
                            if (E(f, /HX-Trigger-After-Settle:/i)) {
                                var r = l;
                                if (!re(l)) {
                                    r = K().body
                                }
                                Xe(f, "HX-Trigger-After-Settle", r)
                            }
                            Q(g)
                        };
                        if (h.settleDelay > 0) {
                            setTimeout(s, h.settleDelay)
                        } else {
                            s()
                        }
                    } catch (e) {
                        ae(l, "htmx:swapError", u);
                        Q(p);
                        throw e
                    }
                };
                var s = G.config.globalViewTransitions;
                if (h.hasOwnProperty("transition")) {
                    s = h.transition
                }
                if (s && oe(l, "htmx:beforeTransition", u) && typeof Promise !== "undefined" && document.startViewTransition) {
                    var m = new Promise(function(e, t) {
                        g = e;
                        p = t
                    }
                    );
                    var x = o;
                    o = function() {
                        document.startViewTransition(function() {
                            x();
                            return m
                        })
                    }
                }
                if (h.swapDelay > 0) {
                    setTimeout(o, h.swapDelay)
                } else {
                    o()
                }
            }
            if (n) {
                ae(l, "htmx:responseError", ne({
                    error: "Response Status Error Code " + f.status + " from " + u.pathInfo.requestPath
                }, u))
            }
        }
        var Sr = {};
        function Er() {
            return {
                init: function(e) {
                    return null
                },
                onEvent: function(e, t) {
                    return true
                },
                transformResponse: function(e, t, r) {
                    return e
                },
                isInlineSwap: function(e) {
                    return false
                },
                handleSwap: function(e, t, r, n) {
                    return false
                },
                encodeParameters: function(e, t, r) {
                    return null
                }
            }
        }
        function Cr(e, t) {
            if (t.init) {
                t.init(C)
            }
            Sr[e] = ne(Er(), t)
        }
        function Rr(e) {
            delete Sr[e]
        }
        function Or(e, r, n) {
            if (e == undefined) {
                return r
            }
            if (r == undefined) {
                r = []
            }
            if (n == undefined) {
                n = []
            }
            var t = Z(e, "hx-ext");
            if (t) {
                te(t.split(","), function(e) {
                    e = e.replace(/ /g, "");
                    if (e.slice(0, 7) == "ignore:") {
                        n.push(e.slice(7));
                        return
                    }
                    if (n.indexOf(e) < 0) {
                        var t = Sr[e];
                        if (t && r.indexOf(t) < 0) {
                            r.push(t)
                        }
                    }
                })
            }
            return Or(u(e), r, n)
        }
        function Tr(e) {
            if (K().readyState !== "loading") {
                e()
            } else {
                K().addEventListener("DOMContentLoaded", e)
            }
        }
        function qr() {
            if (G.config.includeIndicatorStyles !== false) {
                K().head.insertAdjacentHTML("beforeend", "<style>                      ." + G.config.indicatorClass + "{opacity:0;transition: opacity 200ms ease-in;}                      ." + G.config.requestClass + " ." + G.config.indicatorClass + "{opacity:1}                      ." + G.config.requestClass + "." + G.config.indicatorClass + "{opacity:1}                    </style>")
            }
        }
        function Hr() {
            var e = K().querySelector('meta[name="htmx-config"]');
            if (e) {
                return y(e.content)
            } else {
                return null
            }
        }
        function Lr() {
            var e = Hr();
            if (e) {
                G.config = ne(G.config, e)
            }
        }
        Tr(function() {
            Lr();
            qr();
            var e = K().body;
            Nt(e);
            var t = K().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
            e.addEventListener("htmx:abort", function(e) {
                var t = e.target;
                var r = ee(t);
                if (r && r.xhr) {
                    r.xhr.abort()
                }
            });
            var r = window.onpopstate;
            window.onpopstate = function(e) {
                if (e.state && e.state.htmx) {
                    zt();
                    te(t, function(e) {
                        oe(e, "htmx:restored", {
                            document: K(),
                            triggerEvent: oe
                        })
                    })
                } else {
                    if (r) {
                        r(e)
                    }
                }
            }
            ;
            setTimeout(function() {
                oe(e, "htmx:load", {});
                e = null
            }, 0)
        });
        return G
    }()
});