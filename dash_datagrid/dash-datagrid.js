import Qs, { forwardRef as en, useRef as We, useImperativeHandle as tn, useLayoutEffect as At } from "react";
import C from "prop-types";
const Ve = /* @__PURE__ */ Symbol("dash-json-omit");
function rn(t) {
  const e = t;
  return typeof e.nodeType == "number" && typeof e.nodeName == "string" ? !0 : typeof Node < "u" && t instanceof Node;
}
function Qt(t, e, r) {
  if (t === null || typeof t == "string" || typeof t == "boolean")
    return t;
  if (typeof t == "number")
    return Number.isFinite(t) ? t : null;
  if (typeof t > "u" || typeof t == "function" || typeof t == "symbol" || typeof t == "bigint" || typeof t != "object")
    return r ? null : Ve;
  if (rn(t) || e.has(t))
    return null;
  if (t instanceof Date)
    return Number.isNaN(t.getTime()) ? null : t.toISOString();
  e.add(t);
  try {
    if (Array.isArray(t))
      return t.map((s) => {
        const n = Qt(s, e, !0);
        return n === Ve ? null : n;
      });
    const i = Object.getPrototypeOf(t);
    if (i !== Object.prototype && i !== null)
      return null;
    const o = {};
    for (const s of Object.keys(t).sort())
      try {
        const n = Qt(t[s], e, !1);
        n !== Ve && (o[s] = n);
      } catch {
      }
    return o;
  } finally {
    e.delete(t);
  }
}
function Pe(t) {
  const e = Qt(t, /* @__PURE__ */ new WeakSet(), !0);
  return e === Ve ? null : e;
}
function ei(t, e, r, i = Date.now()) {
  return {
    name: t,
    detail: Pe(e),
    timestamp: i,
    sequence: r
  };
}
function on(t) {
  if (!t || typeof t != "object")
    return Pe(t);
  const e = t;
  if (e.data && typeof e.data == "object" && "models" in e)
    return Pe({
      type: e.type,
      data: e.data,
      newRange: e.newRange,
      oldRange: e.oldRange
    });
  const r = {};
  for (const i of [
    "rowIndex",
    "colIndex",
    "prop",
    "val",
    "value",
    "type",
    "colType"
  ])
    i in e && (r[i] = e[i]);
  return Pe(r);
}
function sn(t) {
  const e = Pe(t);
  return {
    value: e,
    serialized: JSON.stringify(e)
  };
}
function nn(t, e) {
  return e ? Object.is(t, e.value) ? !0 : JSON.stringify(Pe(t)) === e.serialized : !1;
}
function ti(t, e, r, i, o = null) {
  let s = !1;
  for (const n of e) {
    const l = r[n];
    if (!Object.is(i[n], l)) {
      if (n === "source" && nn(l, o)) {
        i[n] = l, s = !0;
        continue;
      }
      t[n] = l, i[n] = l;
    }
  }
  return { sourceSyncConsumed: s };
}
function ln(t) {
  return Array.isArray(t) ? [
    ...new Set(
      t.filter((e) => typeof e == "string" && e)
    )
  ].sort() : [];
}
function ri(t, e) {
  const r = Object.entries(e);
  for (const [i, o] of r)
    t.addEventListener(i, o);
  return () => {
    for (const [i, o] of r)
      t.removeEventListener(i, o);
  };
}
var O = {
  allRenderFn: !1,
  element: !0,
  event: !0,
  hasRenderFn: !0,
  hostListener: !0,
  hostListenerTargetWindow: !0,
  hostListenerTargetDocument: !0,
  hostListenerTargetBody: !0,
  hostListenerTargetParent: !1,
  hostListenerTarget: !0,
  member: !0,
  method: !0,
  mode: !0,
  observeAttribute: !0,
  prop: !0,
  propMutable: !0,
  reflect: !0,
  scoped: !0,
  shadowDom: !0,
  slot: !0,
  cssAnnotations: !0,
  state: !0,
  style: !0,
  formAssociated: !1,
  svg: !0,
  updatable: !0,
  vdomAttribute: !0,
  vdomXlink: !0,
  vdomClass: !0,
  vdomFunctional: !0,
  vdomKey: !0,
  vdomListener: !0,
  vdomRef: !0,
  vdomPropOrAttr: !0,
  vdomRender: !0,
  vdomStyle: !0,
  vdomText: !0,
  propChangeCallback: !0,
  taskQueue: !0,
  hotModuleReplacement: !1,
  isDebug: !1,
  isDev: !1,
  isTesting: !1,
  hydrateServerSide: !1,
  hydrateClientSide: !1,
  lifecycleDOMEvents: !1,
  lazyLoad: !1,
  profile: !1,
  slotRelocation: !0,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  appendChildSlotFix: !1,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  cloneNodeFix: !1,
  hydratedAttribute: !1,
  hydratedClass: !0,
  // TODO(STENCIL-1305): remove this option
  scriptDataOpts: !1,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  scopedSlotTextContentFix: !1,
  // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
  shadowDomShim: !1,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  slotChildNodesFix: !1,
  invisiblePrehydration: !0,
  propBoolean: !0,
  propNumber: !0,
  propString: !0,
  constructableCSS: !0,
  devTools: !1,
  shadowDelegatesFocus: !0,
  shadowSlotAssignmentManual: !1,
  initializeNextTick: !1,
  asyncLoading: !0,
  asyncQueue: !1,
  // TODO: deprecated in favour of `setTagTransformer` and `transformTag`. Remove in 5.0
  transformTagName: !1,
  attachStyles: !0,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  experimentalSlotFixes: !1
}, an = (
  /* default */
  "app"
), cn = "http://www.w3.org/2000/svg", dn = "http://www.w3.org/1999/xhtml";
function fo(t, e, r) {
  const i = typeof HTMLElement < "u" ? HTMLElement.prototype : null;
  for (; t && t !== i; ) {
    const o = Object.getOwnPropertyDescriptor(t, e);
    if (o && (!r || o.get)) return o;
    t = Object.getPrototypeOf(t);
  }
}
var hn = (t, e) => {
  var r;
  const i = e.$cmpMeta$;
  Object.entries((r = i.$members$) != null ? r : {}).map(([s, [n]]) => {
    if (n & 31 || n & 32) {
      const l = t[s], a = fo(Object.getPrototypeOf(t), s, !0) || Object.getOwnPropertyDescriptor(t, s);
      a && Object.defineProperty(t, s, {
        get() {
          return a.get.call(this);
        },
        set(c) {
          a.set.call(this, c);
        },
        configurable: !0,
        enumerable: !0
      }), e.$instanceValues$.has(s) ? t[s] = e.$instanceValues$.get(s) : l !== void 0 && (t[s] = l);
    }
  });
}, te = (t) => {
  if (t.__stencil__getHostRef)
    return t.__stencil__getHostRef();
}, un = (t, e) => {
  const r = {
    $flags$: 0,
    $hostElement$: t,
    $cmpMeta$: e,
    $instanceValues$: /* @__PURE__ */ new Map(),
    $serializerValues$: /* @__PURE__ */ new Map()
  };
  r.$onReadyPromise$ = new Promise((o) => r.$onReadyResolve$ = o), t["s-p"] = [], t["s-rc"] = [];
  const i = r;
  return t.__stencil__getHostRef = () => i, e.$flags$ & 512 && O.state && hn(t, r), i;
}, ii = (t, e) => e in t, we = (t, e) => (0, console.error)(t, e);
var yt = /* @__PURE__ */ new Map(), gn = [];
var pn = "slot-fb{display:contents}slot-fb[hidden]{display:none}", oi = "http://www.w3.org/1999/xlink", D = typeof window < "u" ? window : {}, L = D.HTMLElement || class {
}, j = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (t) => t(),
  raf: (t) => requestAnimationFrame(t),
  ael: (t, e, r, i) => t.addEventListener(e, r, i),
  rel: (t, e, r, i) => t.removeEventListener(e, r, i),
  ce: (t, e) => new CustomEvent(t, e)
}, si = O.shadowDom, fn = /* @__PURE__ */ (() => {
  var t;
  let e = !1;
  try {
    (t = D.document) == null || t.addEventListener(
      "e",
      null,
      Object.defineProperty({}, "passive", {
        get() {
          e = !0;
        }
      })
    );
  } catch {
  }
  return e;
})(), vn = (t) => Promise.resolve(t), Or = /* @__PURE__ */ (() => {
  try {
    return D.document.adoptedStyleSheets ? (new CSSStyleSheet(), typeof new CSSStyleSheet().replaceSync == "function") : !1;
  } catch {
  }
  return !1;
})(), er = Or ? !!D.document && Object.getOwnPropertyDescriptor(D.document.adoptedStyleSheets, "length").writable : !1, tr = !1, ni = [], vo = [], mn = (t, e) => (r) => {
  t.push(r), tr || (tr = !0, e && j.$flags$ & 4 ? zr(rr) : j.raf(rr));
}, li = (t) => {
  for (let e = 0; e < t.length; e++)
    try {
      t[e](performance.now());
    } catch (r) {
      we(r);
    }
  t.length = 0;
}, rr = () => {
  li(ni), li(vo), (tr = ni.length > 0) && j.raf(rr);
}, zr = (t) => vn().then(t), yn = /* @__PURE__ */ mn(vo, !0);
var Ue;
function bn(t) {
  var e;
  const r = { mode: "open" };
  r.delegatesFocus = !!(t.$flags$ & 16);
  const i = this.attachShadow(r);
  Ue === void 0 && (Ue = (e = void 0) != null ? e : null), Ue && (er ? i.adoptedStyleSheets.push(Ue) : i.adoptedStyleSheets = [...i.adoptedStyleSheets, Ue]);
}
var mo = (t) => {
  const e = ir(t, "childNodes");
  t.tagName && t.tagName.includes("-") && t["s-cr"] && t.tagName !== "SLOT-FB" && Er(e, t.tagName).forEach((i) => {
    i.nodeType === 1 && i.tagName === "SLOT-FB" && (wn(i, rt(i), !1).length ? i.hidden = !0 : i.hidden = !1);
  });
  let r = 0;
  for (r = 0; r < e.length; r++) {
    const i = e[r];
    i.nodeType === 1 && ir(i, "childNodes").length && mo(i);
  }
}, Sn = (t) => {
  const e = [];
  for (let r = 0; r < t.length; r++) {
    const i = t[r]["s-nr"] || void 0;
    i && i.isConnected && e.push(i);
  }
  return e;
};
function Er(t, e, r) {
  let i = 0, o = [], s;
  for (; i < t.length; i++) {
    if (s = t[i], s["s-sr"] && (!e || s["s-hn"] === e) && (r === void 0 || rt(s) === r) && (o.push(s), typeof r < "u"))
      return o;
    o = [...o, ...Er(s.childNodes, e, r)];
  }
  return o;
}
var wn = (t, e, r = !0) => {
  const i = [];
  (r && t["s-sr"] || !t["s-sr"]) && i.push(t);
  let o = t;
  for (; o = o.nextSibling; )
    rt(o) === e && (r || !o["s-sr"]) && i.push(o);
  return i;
}, ai = (t, e) => t.nodeType === 1 ? t.getAttribute("slot") === null && e === "" || t.getAttribute("slot") === e : t["s-sn"] === e ? !0 : e === "";
var rt = (t) => typeof t["s-sn"] == "string" ? t["s-sn"] : t.nodeType === 1 && t.getAttribute("slot") || void 0;
function xn(t) {
  if (t.assignedElements || t.assignedNodes || !t["s-sr"]) return;
  const e = (r) => (function(i) {
    const o = [], s = this["s-sn"];
    i?.flatten && console.error(`
          Flattening is not supported for Stencil non-shadow slots.
          You can use \`.childNodes\` to nested slot fallback content.
          If you have a particular use case, please open an issue on the Stencil repo.
        `);
    const n = this["s-cr"].parentElement;
    return (n.__childNodes ? n.childNodes : Sn(n.childNodes)).forEach((a) => {
      s === rt(a) && o.push(a);
    }), r ? o.filter(
      (a) => a.nodeType === 1
      /* ElementNode */
    ) : o;
  }).bind(t);
  t.assignedElements = e(!0), t.assignedNodes = e(!1);
}
function Cn(t) {
  t.dispatchEvent(new CustomEvent("slotchange", { bubbles: !1, cancelable: !1, composed: !1 }));
}
function $n(t, e) {
  var r;
  if (e = e || ((r = t["s-ol"]) == null ? void 0 : r.parentElement), !e) return { slotNode: null, slotName: "" };
  const i = t["s-sn"] = rt(t) || "", o = ir(e, "childNodes");
  return { slotNode: Er(o, e.tagName, i)[0], slotName: i };
}
function ir(t, e) {
  if ("__" + e in t) {
    const r = t["__" + e];
    return typeof r != "function" ? r : r.bind(t);
  } else
    return typeof t[e] != "function" ? t[e] : t[e].bind(t);
}
var ye = (t, e = "") => () => {
};
function Rn(t) {
  var e, r, i;
  return (i = (r = (e = t.head) == null ? void 0 : e.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : r.getAttribute("content")) != null ? i : void 0;
}
var le = /* @__PURE__ */ new WeakMap(), On = (t, e, r) => {
  let i = yt.get(t);
  Or && r ? (i = i || new CSSStyleSheet(), typeof i == "string" ? i = e : i.replaceSync(e)) : i = e, yt.set(t, i);
}, zn = (t, e, r) => {
  var i, o, s;
  const n = yo(e, r), l = yt.get(n);
  if (!D.document)
    return n;
  if (t = t.nodeType === 11 ? t : D.document, l)
    if (typeof l == "string") {
      t = t.head || t;
      let a = le.get(t), c;
      if (a || le.set(t, a = /* @__PURE__ */ new Set()), !a.has(n)) {
        c = D.document.createElement("style"), c.textContent = l;
        const d = (i = j.$nonce$) != null ? i : Rn(D.document);
        if (d != null && c.setAttribute("nonce", d), !(e.$flags$ & 1))
          if (t.nodeName === "HEAD") {
            const h = t.querySelectorAll("link[rel=preconnect]"), u = h.length > 0 ? h[h.length - 1].nextSibling : t.querySelector("style");
            t.insertBefore(
              c,
              u?.parentNode === t ? u : null
            );
          } else if ("host" in t)
            if (Or) {
              const h = (o = t.defaultView) != null ? o : t.ownerDocument.defaultView, u = new h.CSSStyleSheet();
              u.replaceSync(l), er ? t.adoptedStyleSheets.unshift(u) : t.adoptedStyleSheets = [u, ...t.adoptedStyleSheets];
            } else {
              const h = t.querySelector("style");
              h ? h.textContent = l + h.textContent : t.prepend(c);
            }
          else
            t.append(c);
        e.$flags$ & 1 && t.insertBefore(c, null), e.$flags$ & 4 && (c.textContent += pn), a && a.add(n);
      }
    } else {
      let a = le.get(t);
      if (a || le.set(t, a = /* @__PURE__ */ new Set()), !a.has(n)) {
        const c = (s = t.defaultView) != null ? s : t.ownerDocument.defaultView;
        let d;
        if (l.constructor === c.CSSStyleSheet)
          d = l;
        else {
          d = new c.CSSStyleSheet();
          for (let h = 0; h < l.cssRules.length; h++)
            d.insertRule(l.cssRules[h].cssText, h);
        }
        er ? t.adoptedStyleSheets.push(d) : t.adoptedStyleSheets = [...t.adoptedStyleSheets, d], a.add(n);
      }
    }
  return n;
}, En = (t) => {
  const e = t.$cmpMeta$, r = t.$hostElement$, i = e.$flags$, o = ye("attachStyles", e.$tagName$), s = zn(
    r.shadowRoot ? r.shadowRoot : r.getRootNode(),
    e,
    t.$modeName$
  );
  i & 10 && (r["s-sc"] = s, r.classList.add(s + "-h")), o();
}, yo = (t, e) => "sc-" + (e && t.$flags$ & 32 ? t.$tagName$ + "-" + e : t.$tagName$);
var Dn = (t) => t != null && t !== void 0, Dr = (t) => (t = typeof t, t === "object" || t === "function"), f = (t, e, ...r) => {
  typeof t == "string" && (t = t);
  let i = null, o = null, s = null, n = !1, l = !1;
  const a = [], c = (h) => {
    for (let u = 0; u < h.length; u++)
      i = h[u], Array.isArray(i) ? c(i) : i != null && typeof i != "boolean" && ((n = typeof t != "function" && !Dr(i)) && (i = String(i)), n && l ? a[a.length - 1].$text$ += i : a.push(n ? bt(null, i) : i), l = n);
  };
  if (c(r), e) {
    e.key && (o = e.key), e.name && (s = e.name);
    {
      const h = e.className || e.class;
      h && (e.class = typeof h != "object" ? h : Object.keys(h).filter((u) => h[u]).join(" "));
    }
  }
  if (typeof t == "function")
    return t(
      e === null ? {} : e,
      a,
      kn
    );
  const d = bt(t, null);
  return d.$attrs$ = e, a.length > 0 && (d.$children$ = a), d.$key$ = o, d.$name$ = s, d;
}, bt = (t, e) => {
  const r = {
    $flags$: 0,
    $tag$: t,
    // Normalize undefined to null to prevent rendering "undefined" as text
    $text$: e ?? null,
    $elm$: null,
    $children$: null
  };
  return r.$attrs$ = null, r.$key$ = null, r.$name$ = null, r;
}, M = {}, Tn = (t) => t && t.$tag$ === M, kn = {
  forEach: (t, e) => t.map(ci).forEach(e),
  map: (t, e) => t.map(ci).map(e).map(Pn)
}, ci = (t) => ({
  vattrs: t.$attrs$,
  vchildren: t.$children$,
  vkey: t.$key$,
  vname: t.$name$,
  vtag: t.$tag$,
  vtext: t.$text$
}), Pn = (t) => {
  if (typeof t.vtag == "function") {
    const r = { ...t.vattrs };
    return t.vkey && (r.key = t.vkey), t.vname && (r.name = t.vname), f(t.vtag, r, ...t.vchildren || []);
  }
  const e = bt(t.vtag, t.vtext);
  return e.$attrs$ = t.vattrs, e.$children$ = t.vchildren, e.$key$ = t.vkey, e.$name$ = t.vname, e;
};
var bo = "-shadowcsshost", jn = "-shadowcssslotted", Ln = "-shadowcsscontext", Tr = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)", Gd = new RegExp("(" + bo + Tr, "gim"), Xd = new RegExp("(" + Ln + Tr, "gim"), Vd = new RegExp("(" + jn + Tr, "gim"), Kd = bo + "-no-combinator";
var Fn = (t) => gn.map((e) => e(t)).find((e) => !!e), So = (t) => {
  if (!t) return;
  const e = Object.keys(t);
  if (e.length === 0) return;
  let r = !1;
  for (const o of e) {
    if (r) break;
    for (const s of t[o])
      if (typeof s == "string") {
        r = !0;
        break;
      }
  }
  if (!r) return t;
  const i = {};
  for (const o of e)
    i[o] = t[o].map(
      (s) => typeof s == "string" ? { [s]: 0 } : s
    );
  return i;
}, wo = (t, e, r) => t != null && !Dr(t) ? e & 4 ? t === "false" ? !1 : t === "" || !!t : e & 2 ? typeof t == "string" ? parseFloat(t) : typeof t == "number" ? t : NaN : e & 1 ? String(t) : t : t, In = (t) => t, m = (t, e, r) => {
  const i = In(t);
  return {
    emit: (o) => xo(i, e, {
      bubbles: !!(r & 4),
      composed: !!(r & 2),
      cancelable: !!(r & 1),
      detail: o
    })
  };
}, xo = (t, e, r) => {
  const i = j.ce(e, r);
  return t.dispatchEvent(i), i;
}, di = (t, e, r, i, o, s, n) => {
  if (r === i)
    return;
  let l = ii(t, e), a = e.toLowerCase();
  if (e === "class") {
    const c = t.classList, d = hi(r);
    let h = hi(i);
    c.remove(...d.filter((u) => u && !h.includes(u))), c.add(...h.filter((u) => u && !d.includes(u)));
  } else if (e === "style") {
    for (const c in r)
      (!i || i[c] == null) && (c.includes("-") ? t.style.removeProperty(c) : t.style[c] = "");
    for (const c in i)
      (!r || i[c] !== r[c]) && (c.includes("-") ? t.style.setProperty(c, i[c]) : t.style[c] = i[c]);
  } else if (e !== "key") if (e === "ref")
    i && Mn(i, t);
  else if (!t.__lookupSetter__(e) && e[0] === "o" && e[1] === "n") {
    if (e[2] === "-" ? e = e.slice(3) : ii(D, a) ? e = a.slice(2) : e = a[2] + e.slice(3), r || i) {
      const c = e.endsWith(Co);
      e = e.replace(An, ""), r && j.rel(t, e, r, c), i && j.ael(t, e, i, c);
    }
  } else if (e[0] === "a" && e.startsWith("attr:")) {
    const c = e.slice(5);
    let d;
    {
      const h = te(t);
      if (h && h.$cmpMeta$ && h.$cmpMeta$.$members$) {
        const u = h.$cmpMeta$.$members$[c];
        u && u[1] && (d = u[1]);
      }
    }
    d || (d = c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), i == null || i === !1 ? (i !== !1 || t.getAttribute(d) === "") && t.removeAttribute(d) : t.setAttribute(d, i === !0 ? "" : i);
    return;
  } else if (e[0] === "p" && e.startsWith("prop:")) {
    const c = e.slice(5);
    try {
      t[c] = i;
    } catch {
    }
    return;
  } else {
    const c = Dr(i);
    if ((l || c && i !== null) && !o)
      try {
        if (t.tagName.includes("-"))
          t[e] !== i && (t[e] = i);
        else {
          const h = i ?? "";
          e === "list" ? l = !1 : (r == null || t[e] !== h) && (typeof t.__lookupSetter__(e) == "function" ? t[e] = h : t.setAttribute(e, h));
        }
      } catch {
      }
    let d = !1;
    a !== (a = a.replace(/^xlink\:?/, "")) && (e = a, d = !0), i == null || i === !1 ? (i !== !1 || t.getAttribute(e) === "") && (d ? t.removeAttributeNS(oi, e) : t.removeAttribute(e)) : (!l || s & 4 || o) && !c && t.nodeType === 1 && (i = i === !0 ? "" : i, d ? t.setAttributeNS(oi, e, i) : t.setAttribute(e, i));
  }
}, _n = /\s/, hi = (t) => (typeof t == "object" && t && "baseVal" in t && (t = t.baseVal), !t || typeof t != "string" ? [] : t.split(_n)), Co = "Capture", An = new RegExp(Co + "$"), or = (t, e, r, i) => {
  const o = e.$elm$.nodeType === 11 && e.$elm$.host ? e.$elm$.host : e.$elm$, s = t && t.$attrs$ || {}, n = e.$attrs$ || {};
  for (const l of ui(Object.keys(s)))
    l in n || di(
      o,
      l,
      s[l],
      void 0,
      r,
      e.$flags$
    );
  for (const l of ui(Object.keys(n)))
    di(
      o,
      l,
      s[l],
      n[l],
      r,
      e.$flags$
    );
};
function ui(t) {
  return t.includes("ref") ? (
    // we need to sort these to ensure that `'ref'` is the last attr
    [...t.filter((e) => e !== "ref"), "ref"]
  ) : (
    // no need to sort, return the original array
    t
  );
}
var pt, St, be, Je = !1, wt = !1, kt = !1, A = !1, sr = [], nr = [], xt = (t, e, r) => {
  var i;
  const o = e.$children$[r];
  let s = 0, n, l, a;
  if (Je || (kt = !0, o.$tag$ === "slot" && (o.$flags$ |= o.$children$ ? (
    // slot element has fallback content
    // still create an element that "mocks" the slot element
    2
  ) : (
    // slot element does not have fallback content
    // create an html comment we'll use to always reference
    // where actual slot content should sit next to
    1
  ))), o.$text$ != null)
    n = o.$elm$ = D.document.createTextNode(o.$text$);
  else if (o.$flags$ & 1)
    n = o.$elm$ = D.document.createTextNode(""), or(null, o, A);
  else {
    if (A || (A = o.$tag$ === "svg"), !D.document)
      throw new Error("You are trying to render a Stencil component in an environment that doesn't support the DOM.");
    if (n = o.$elm$ = D.document.createElementNS(
      A ? cn : dn,
      !Je && O.slotRelocation && o.$flags$ & 2 ? "slot-fb" : o.$tag$
    ), A && o.$tag$ === "foreignObject" && (A = !1), or(null, o, A), Dn(pt) && n["s-si"] !== pt && n.classList.add(n["s-si"] = pt), o.$children$) {
      const c = o.$tag$ === "template" ? n.content : n;
      for (s = 0; s < o.$children$.length; ++s)
        l = xt(t, o, s), l && c.appendChild(l);
    }
    o.$tag$ === "svg" ? A = !1 : n.tagName === "foreignObject" && (A = !0);
  }
  return n["s-hn"] = be, o.$flags$ & 3 && (n["s-sr"] = !0, n["s-cr"] = St, n["s-sn"] = o.$name$ || "", n["s-rf"] = (i = o.$attrs$) == null ? void 0 : i.ref, xn(n), a = t && t.$children$ && t.$children$[r], a && a.$tag$ === o.$tag$ && t.$elm$ && $o(t.$elm$), Do(St, n, e.$elm$, t?.$elm$)), n;
}, $o = (t) => {
  j.$flags$ |= 1;
  const e = t.closest(be.toLowerCase());
  if (e != null) {
    const r = Array.from(e.__childNodes || e.childNodes).find(
      (o) => o["s-cr"]
    ), i = Array.from(
      t.__childNodes || t.childNodes
    );
    for (const o of r ? i.reverse() : i)
      o["s-sh"] != null && (U(e, o, r ?? null), o["s-sh"] = void 0, kt = !0);
  }
  j.$flags$ &= -2;
}, Ct = (t, e) => {
  j.$flags$ |= 1;
  const r = Array.from(t.__childNodes || t.childNodes);
  if (t["s-sr"]) {
    let i = t;
    for (; i = i.nextSibling; )
      i && i["s-sn"] === t["s-sn"] && i["s-sh"] === be && r.push(i);
  }
  for (let i = r.length - 1; i >= 0; i--) {
    const o = r[i];
    o["s-hn"] !== be && o["s-ol"] && (U(Ze(o).parentNode, o, Ze(o)), o["s-ol"].remove(), o["s-ol"] = void 0, o["s-sh"] = void 0, kt = !0), e && Ct(o, e);
  }
  j.$flags$ &= -2;
}, Ro = (t, e, r, i, o, s) => {
  let n = t["s-cr"] && t["s-cr"].parentNode || t, l;
  for (n.shadowRoot && n.tagName === be && (n = n.shadowRoot), r.$tag$ === "template" && (n = n.content); o <= s; ++o)
    i[o] && (l = xt(null, r, o), l && (i[o].$elm$ = l, U(n, l, Ze(e))));
}, Oo = (t, e, r) => {
  for (let i = e; i <= r; ++i) {
    const o = t[i];
    if (o) {
      const s = o.$elm$;
      Eo(o), s && (wt = !0, s["s-ol"] ? s["s-ol"].remove() : Ct(s, !0), s.remove());
    }
  }
}, Hn = (t, e, r, i, o = !1) => {
  let s = 0, n = 0, l = 0, a = 0, c = e.length - 1, d = e[0], h = e[c], u = i.length - 1, g = i[0], p = i[u], v, y;
  const w = r.$tag$ === "template" ? t.content : t;
  for (; s <= c && n <= u; )
    if (d == null)
      d = e[++s];
    else if (h == null)
      h = e[--c];
    else if (g == null)
      g = i[++n];
    else if (p == null)
      p = i[--u];
    else if (at(d, g, o))
      De(d, g, o), d = e[++s], g = i[++n];
    else if (at(h, p, o))
      De(h, p, o), h = e[--c], p = i[--u];
    else if (at(d, p, o))
      (d.$tag$ === "slot" || p.$tag$ === "slot") && Ct(d.$elm$.parentNode, !1), De(d, p, o), U(w, d.$elm$, h.$elm$.nextSibling), d = e[++s], p = i[--u];
    else if (at(h, g, o))
      (d.$tag$ === "slot" || p.$tag$ === "slot") && Ct(h.$elm$.parentNode, !1), De(h, g, o), U(w, h.$elm$, d.$elm$), h = e[--c], g = i[++n];
    else {
      for (l = -1, a = s; a <= c; ++a)
        if (e[a] && e[a].$key$ !== null && e[a].$key$ === g.$key$) {
          l = a;
          break;
        }
      l >= 0 ? (y = e[l], y.$tag$ !== g.$tag$ ? v = xt(e && e[n], r, l) : (De(y, g, o), e[l] = void 0, v = y.$elm$), g = i[++n]) : (v = xt(e && e[n], r, n), g = i[++n]), v && U(
        Ze(d.$elm$).parentNode,
        v,
        Ze(d.$elm$)
      );
    }
  s > c ? Ro(
    t,
    i[u + 1] == null ? null : i[u + 1].$elm$,
    r,
    i,
    n,
    u
  ) : n > u && Oo(e, s, c);
}, at = (t, e, r = !1) => t.$tag$ === e.$tag$ ? t.$tag$ === "slot" ? t.$name$ === e.$name$ : r ? (r && !t.$key$ && e.$key$ && (t.$key$ = e.$key$), !0) : t.$key$ === e.$key$ : !1, Ze = (t) => t && t["s-ol"] || t, De = (t, e, r = !1) => {
  const i = e.$elm$ = t.$elm$, o = t.$children$, s = e.$children$, n = e.$tag$, l = e.$text$;
  let a;
  l == null ? (A = n === "svg" ? !0 : n === "foreignObject" ? !1 : A, n === "slot" && !Je && t.$name$ !== e.$name$ && (e.$elm$["s-sn"] = e.$name$ || "", $o(e.$elm$.parentElement)), or(t, e, A), o !== null && s !== null ? Hn(i, o, e, s, r) : s !== null ? (t.$text$ !== null && (i.textContent = ""), Ro(i, null, e, s, 0, s.length - 1)) : (
    // don't do this on initial render as it can cause non-hydrated content to be removed
    !r && O.updatable && o !== null && Oo(o, 0, o.length - 1)
  ), A && n === "svg" && (A = !1)) : (a = i["s-cr"]) ? a.parentNode.textContent = l : t.$text$ !== l && (i.data = l);
}, Y = [], zo = (t) => {
  let e, r, i;
  const o = t.__childNodes || t.childNodes;
  for (const s of o) {
    if (s["s-sr"] && (e = s["s-cr"]) && e.parentNode) {
      r = e.parentNode.__childNodes || e.parentNode.childNodes;
      const n = s["s-sn"];
      for (i = r.length - 1; i >= 0; i--)
        if (e = r[i], !e["s-cn"] && !e["s-nr"] && e["s-hn"] !== s["s-hn"] && (!e["s-sh"] || e["s-sh"] !== s["s-hn"]))
          if (ai(e, n)) {
            let l = Y.find((a) => a.$nodeToRelocate$ === e);
            wt = !0, e["s-sn"] = e["s-sn"] || n, l ? (l.$nodeToRelocate$["s-sh"] = s["s-hn"], l.$slotRefNode$ = s) : (e["s-sh"] = s["s-hn"], Y.push({
              $slotRefNode$: s,
              $nodeToRelocate$: e
            })), e["s-sr"] && Y.map((a) => {
              ai(a.$nodeToRelocate$, e["s-sn"]) && (l = Y.find((c) => c.$nodeToRelocate$ === e), l && !a.$slotRefNode$ && (a.$slotRefNode$ = l.$slotRefNode$));
            });
          } else Y.some((l) => l.$nodeToRelocate$ === e) || Y.push({
            $nodeToRelocate$: e
          });
    }
    s.nodeType === 1 && zo(s);
  }
}, Eo = (t) => {
  t.$attrs$ && t.$attrs$.ref && sr.push(() => t.$attrs$.ref(null)), t.$children$ && t.$children$.map(Eo);
}, Mn = (t, e) => {
  nr.push(() => t(e));
}, Nn = () => {
  sr.forEach((t) => t()), sr.length = 0, nr.forEach((t) => t()), nr.length = 0;
}, U = (t, e, r, i) => {
  if (typeof e["s-sn"] == "string" && e["s-sr"] && e["s-cr"])
    Do(e["s-cr"], e, t, e.parentElement);
  else if (typeof e["s-sn"] == "string") {
    t.insertBefore(e, r);
    const { slotNode: o } = $n(e);
    return o && !i && Cn(o), e;
  }
  return t.__insertBefore ? t.__insertBefore(e, r) : t?.insertBefore(e, r);
};
function Do(t, e, r, i) {
  var o, s;
  let n;
  if (t && typeof e["s-sn"] == "string" && e["s-sr"] && t.parentNode && t.parentNode["s-sc"] && (n = e["s-si"] || t.parentNode["s-sc"])) {
    const l = e["s-sn"], a = e["s-hn"];
    if ((o = r.classList) == null || o.add(n + "-s"), i && ((s = i.classList) != null && s.contains(n + "-s"))) {
      let c = (i.__childNodes || i.childNodes)[0], d = !1;
      for (; c; ) {
        if (c["s-sn"] !== l && c["s-hn"] === a && c["s-sr"]) {
          d = !0;
          break;
        }
        c = c.nextSibling;
      }
      d || i.classList.remove(n + "-s");
    }
  }
}
var Bn = (t, e, r = !1) => {
  var i, o, s, n, l;
  const a = t.$hostElement$, c = t.$cmpMeta$, d = t.$vnode$ || bt(null, null), u = Tn(e) ? e : f(null, null, e);
  if (be = a.tagName, c.$attrsToReflect$ && (u.$attrs$ = u.$attrs$ || {}, c.$attrsToReflect$.forEach(([g, p]) => {
    O.serializer && t.$serializerValues$.has(g) ? u.$attrs$[p] = t.$serializerValues$.get(g) : u.$attrs$[p] = a[g];
  })), r && u.$attrs$)
    for (const g of Object.keys(u.$attrs$))
      a.hasAttribute(g) && !["key", "ref", "style", "class"].includes(g) && (u.$attrs$[g] = a[g]);
  u.$tag$ = null, u.$flags$ |= 4, t.$vnode$ = u, u.$elm$ = d.$elm$ = a.shadowRoot || a, pt = a["s-sc"], Je = !!(c.$flags$ & 1) && !(c.$flags$ & 128), St = a["s-cr"], wt = !1, De(d, u, r);
  {
    if (j.$flags$ |= 1, kt) {
      zo(u.$elm$);
      for (const g of Y) {
        const p = g.$nodeToRelocate$;
        if (!p["s-ol"] && D.document) {
          const v = D.document.createTextNode("");
          v["s-nr"] = p, U(
            p.parentNode,
            p["s-ol"] = v,
            p,
            r
          );
        }
      }
      for (const g of Y) {
        const p = g.$nodeToRelocate$, v = g.$slotRefNode$;
        if (p.nodeType === 1 && r && (p["s-ih"] = (i = p.hidden) != null ? i : !1), v) {
          const y = v.parentNode;
          let w = v.nextSibling;
          if (w && w.nodeType === 1) {
            let b = (o = p["s-ol"]) == null ? void 0 : o.previousSibling;
            for (; b; ) {
              let $ = (s = b["s-nr"]) != null ? s : null;
              if ($ && $["s-sn"] === p["s-sn"] && y === ($.__parentNode || $.parentNode)) {
                for ($ = $.nextSibling; $ === p || $?.["s-sr"]; )
                  $ = $?.nextSibling;
                if (!$ || !$["s-nr"]) {
                  w = $;
                  break;
                }
              }
              b = b.previousSibling;
            }
          }
          const x = p.__parentNode || p.parentNode, S = p.__nextSibling || p.nextSibling;
          if ((!w && y !== x || S !== w) && p !== w) {
            if (U(y, p, w, r), p.nodeType === 8 && p.nodeValue.startsWith("s-nt-")) {
              const b = D.document.createTextNode(p.nodeValue.replace(/^s-nt-/, ""));
              b["s-hn"] = p["s-hn"], b["s-sn"] = p["s-sn"], b["s-sh"] = p["s-sh"], b["s-sr"] = p["s-sr"], b["s-ol"] = p["s-ol"], b["s-ol"]["s-nr"] = b, U(p.parentNode, b, p, r), p.parentNode.removeChild(p);
            }
            p.nodeType === 1 && p.tagName !== "SLOT-FB" && (p.hidden = (n = p["s-ih"]) != null ? n : !1);
          }
          p && typeof v["s-rf"] == "function" && v["s-rf"](v);
        } else p.nodeType === 1 && (p.hidden = !0);
      }
    }
    wt && mo(u.$elm$), j.$flags$ &= -2, Y.length = 0;
  }
  if (!Je && !(c.$flags$ & 1) && a["s-cr"]) {
    const g = u.$elm$.__childNodes || u.$elm$.childNodes;
    for (const p of g)
      if (p["s-hn"] !== be && !p["s-sh"]) {
        if (r && p["s-ih"] == null && (p["s-ih"] = (l = p.hidden) != null ? l : !1), p.nodeType === 1)
          p.hidden = !0;
        else if (p.nodeType === 3 && p.nodeValue.trim()) {
          const v = D.document.createComment("s-nt-" + p.nodeValue);
          v["s-sn"] = p["s-sn"], U(p.parentNode, v, p, r), p.parentNode.removeChild(p);
        }
      }
  }
  St = void 0, Nn();
}, To = (t, e) => {
  if (e && !t.$onRenderResolve$ && e["s-p"]) {
    const r = e["s-p"].push(
      new Promise(
        (i) => t.$onRenderResolve$ = () => {
          e["s-p"].splice(r - 1, 1), i();
        }
      )
    );
  }
}, Pt = (t, e) => {
  if (t.$flags$ |= 16, t.$flags$ & 4) {
    t.$flags$ |= 512;
    return;
  }
  To(t, t.$ancestorComponent$);
  const r = () => Wn(t, e);
  if (e) {
    queueMicrotask(() => {
      r();
    });
    return;
  }
  return yn(r);
}, Wn = (t, e) => {
  const r = t.$hostElement$, i = ye("scheduleUpdate", t.$cmpMeta$.$tagName$), o = r;
  if (!o)
    throw new Error(
      `Can't render component <${r.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`
    );
  let s;
  return e ? s = je(o, "componentWillLoad", void 0, r) : s = je(o, "componentWillUpdate", void 0, r), s = gi(s, () => je(o, "componentWillRender", void 0, r)), i(), gi(s, () => Gn(t, o, e));
}, gi = (t, e) => Un(t) ? t.then(e).catch((r) => {
  console.error(r), e();
}) : e(), Un = (t) => t instanceof Promise || t && t.then && typeof t.then == "function", Gn = async (t, e, r) => {
  var i;
  const o = t.$hostElement$, s = ye("update", t.$cmpMeta$.$tagName$), n = o["s-rc"];
  r && En(t);
  const l = ye("render", t.$cmpMeta$.$tagName$);
  Xn(t, e, o, r), n && (n.map((a) => a()), o["s-rc"] = void 0), l(), s();
  {
    const a = (i = o["s-p"]) != null ? i : [], c = () => Kn(t);
    a.length === 0 ? c() : (Promise.all(a).then(c).catch(c), t.$flags$ |= 4, a.length = 0);
  }
}, lr = null, Xn = (t, e, r, i) => {
  try {
    lr = e, e = e.render && e.render(), t.$flags$ &= -17, t.$flags$ |= 2, (O.hasRenderFn || O.reflect) && (O.vdomRender || O.reflect) && (O.hydrateServerSide || Bn(t, e, i));
  } catch (a) {
    we(a, t.$hostElement$);
  }
  return lr = null, null;
}, Vn = () => lr, Kn = (t) => {
  const e = t.$cmpMeta$.$tagName$, r = t.$hostElement$, i = ye("postUpdate", e), o = r, s = t.$ancestorComponent$;
  je(o, "componentDidRender", void 0, r), t.$flags$ & 64 ? (je(o, "componentDidUpdate", void 0, r), i()) : (t.$flags$ |= 64, Jn(r), je(o, "componentDidLoad", void 0, r), i(), t.$onReadyResolve$(r), s || qn()), t.$onRenderResolve$ && (t.$onRenderResolve$(), t.$onRenderResolve$ = void 0), t.$flags$ & 512 && zr(() => Pt(t, !1)), t.$flags$ &= -517;
}, Yn = (t) => {
  var e;
  {
    const r = te(t), i = (e = r?.$hostElement$) == null ? void 0 : e.isConnected;
    return i && (r.$flags$ & 18) === 2 && Pt(r, !1), i;
  }
}, qn = (t) => {
  zr(() => xo(D, "appload", { detail: { namespace: an } }));
}, je = (t, e, r, i) => {
  if (t && t[e])
    try {
      return t[e](r);
    } catch (o) {
      we(o, i);
    }
}, Jn = (t) => {
  var e;
  return t.classList.add((e = O.hydratedSelectorName) != null ? e : "hydrated");
}, Zn = (t, e) => te(t).$instanceValues$.get(e), pi = (t, e, r, i) => {
  const o = te(t);
  if (!o || O.serializer && o.$serializerValues$.has(e) && o.$serializerValues$.get(e) === r)
    return;
  const s = t, n = o.$instanceValues$.get(e), l = o.$flags$, a = s;
  r = wo(
    r,
    i.$members$[e][0]
  );
  const c = Number.isNaN(n) && Number.isNaN(r);
  if (r !== n && !c) {
    if (o.$instanceValues$.set(e, r), O.serializer && O.reflect && i.$attrsToReflect$ && i.$serializers$ && i.$serializers$[e]) {
      const h = (u) => {
        let g = r;
        for (const p of i.$serializers$[e]) {
          const [[v]] = Object.entries(p);
          g = u[v](g, e);
        }
        o.$serializerValues$.set(e, g);
      };
      a ? h(a) : o.$fetchedCbList$.push(() => {
        h(o.$lazyInstance$);
      });
    }
    if (i.$watchers$) {
      const h = i.$watchers$[e];
      h && h.map((u) => {
        try {
          const [[g, p]] = Object.entries(u);
          (l & 128 || p & 1) && (a ? a[g](r, n, e) : o.$fetchedCbList$.push(() => {
            o.$lazyInstance$[g](r, n, e);
          }));
        } catch (g) {
          we(g, s);
        }
      });
    }
    if (l & 2) {
      if (a.componentShouldUpdate && a.componentShouldUpdate(r, n, e) === !1 && !(l & 16))
        return;
      l & 16 || Pt(o, !1);
    }
  }
}, Qn = (t, e, r) => {
  var i, o;
  const s = t.prototype;
  if (e.$members$ || O.propChangeCallback) {
    t.watchers && !e.$watchers$ && (e.$watchers$ = So(t.watchers)), t.deserializers && !e.$deserializers$ && (e.$deserializers$ = t.deserializers), t.serializers && !e.$serializers$ && (e.$serializers$ = t.serializers);
    const n = Object.entries((i = e.$members$) != null ? i : {});
    n.map(([l, [a]]) => {
      if (a & 31 || a & 32) {
        const { get: c, set: d } = fo(s, l) || {};
        c && (e.$members$[l][0] |= 2048), d && (e.$members$[l][0] |= 4096), (r & 1 || !c) && Object.defineProperty(s, l, {
          get() {
            return c ? c.apply(this) : Zn(this, l);
          },
          configurable: !0,
          enumerable: !0
        }), Object.defineProperty(s, l, {
          set(h) {
            const u = te(this);
            if (u) {
              if (d) {
                typeof (a & 32 ? this[l] : u.$hostElement$[l]) > "u" && u.$instanceValues$.get(l) && (h = u.$instanceValues$.get(l)), d.apply(this, [
                  wo(
                    h,
                    a
                  )
                ]), h = a & 32 ? this[l] : u.$hostElement$[l], pi(this, l, h, e);
                return;
              }
              {
                pi(this, l, h, e);
                return;
              }
            }
          }
        });
      }
    });
    {
      const l = /* @__PURE__ */ new Map();
      s.attributeChangedCallback = function(a, c, d) {
        j.jmp(() => {
          var h;
          const u = l.get(a), g = te(this);
          if (O.serializer && g.$serializerValues$.has(u) && g.$serializerValues$.get(u) === d)
            return;
          if (this.hasOwnProperty(u) && O.lazyLoad, O.deserializer && e.$deserializers$ && e.$deserializers$[u]) {
            const x = (S, b) => {
              const $ = b?.[S](d, u);
              $ !== this[u] && (this[u] = $);
            };
            for (const S of e.$deserializers$[u]) {
              const [[b]] = Object.entries(S);
              x(b, this);
            }
            return;
          } else {
            if (s.hasOwnProperty(u) && typeof this[u] == "number" && // cast type to number to avoid TS compiler issues
            this[u] == d)
              return;
            if (u == null) {
              const x = g?.$flags$;
              if (g && x && !(x & 8) && d !== c) {
                const b = this, $ = (h = e.$watchers$) == null ? void 0 : h[a];
                $?.forEach((R) => {
                  const [[z, ie]] = Object.entries(R);
                  b[z] != null && (x & 128 || ie & 1) && b[z].call(b, d, c, a);
                });
              }
              return;
            }
          }
          const p = n.find(([x]) => x === u), v = p && p[1][0] & 4, y = v && d === null && this[u] === void 0;
          v && (d = !(d === null || d === "false"));
          const w = Object.getOwnPropertyDescriptor(s, u);
          !y && d != this[u] && (!w.get || w.set) && (this[u] = d);
        });
      }, t.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((o = e.$watchers$) != null ? o : {}),
          ...n.filter(
            ([a, c]) => c[0] & 31
            /* HasAttribute */
          ).map(([a, c]) => {
            var d;
            const h = c[1] || a;
            return l.set(h, a), c[0] & 512 && ((d = e.$attrsToReflect$) == null || d.push([a, h])), h;
          })
        ])
      );
    }
  }
  return t;
}, el = async (t, e, r, i) => {
  let o;
  try {
    if ((e.$flags$ & 32) === 0) {
      e.$flags$ |= 32;
      const l = r.$lazyBundleId$;
      if (!(O.lazyLoad && l)) {
        o = t.constructor;
        const a = t.localName;
        customElements.whenDefined(a).then(
          () => e.$flags$ |= 128
          /* isWatchReady */
        );
      }
      if (O.style && o && o.style) {
        let a;
        typeof o.style == "string" ? a = o.style : O.mode && typeof o.style != "string" && (e.$modeName$ = Fn(t), e.$modeName$ && (a = o.style[e.$modeName$]), O.hydrateServerSide && e.$modeName$);
        const c = yo(r, e.$modeName$);
        if (!yt.has(c) || O.hotModuleReplacement && i) {
          const d = ye("registerStyles", r.$tagName$);
          O.hydrateServerSide && O.shadowDom, On(c, a, !!(r.$flags$ & 1)), d();
        }
      }
    }
    const s = e.$ancestorComponent$, n = () => Pt(e, !0);
    O.asyncLoading && s && s["s-rc"] ? s["s-rc"].push(n) : n();
  } catch (s) {
    we(s, t), e.$onRenderResolve$ && (e.$onRenderResolve$(), e.$onRenderResolve$ = void 0), e.$onReadyResolve$ && e.$onReadyResolve$(t);
  }
}, fi = (t, e) => {
}, tl = (t) => {
  if ((j.$flags$ & 1) === 0) {
    const e = te(t);
    if (!e)
      return;
    const r = e.$cmpMeta$, i = ye("connectedCallback", r.$tagName$);
    if (e.$flags$ & 1)
      ko(t, e, r.$listeners$), e?.$lazyInstance$ ? fi(e.$lazyInstance$) : e?.$onReadyPromise$ && e.$onReadyPromise$.then(() => fi(e.$lazyInstance$));
    else {
      e.$flags$ |= 1, // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
      r.$flags$ & 12 && rl(t);
      {
        let o = t;
        for (; o = o.parentNode || o.host; )
          if (o["s-p"]) {
            To(e, e.$ancestorComponent$ = o);
            break;
          }
      }
      r.$members$ && Object.entries(r.$members$).map(([o, [s]]) => {
        if (s & 31 && Object.prototype.hasOwnProperty.call(t, o)) {
          const n = t[o];
          delete t[o], t[o] = n;
        }
      }), el(t, e, r);
    }
    i();
  }
}, rl = (t) => {
  if (!D.document)
    return;
  const e = t["s-cr"] = D.document.createComment(
    ""
  );
  e["s-cn"] = !0, U(t, e, t.firstChild);
}, il = async (t) => {
  if ((j.$flags$ & 1) === 0) {
    const e = te(t);
    e?.$rmListeners$ && (e.$rmListeners$.map((r) => r()), e.$rmListeners$ = void 0);
  }
  le.has(t) && le.delete(t), t.shadowRoot && le.has(t.shadowRoot) && le.delete(t.shadowRoot);
}, I = (t, e) => {
  const r = {
    $flags$: e[0],
    $tagName$: e[1]
  };
  try {
    O.member && (r.$members$ = e[2]), O.hostListener && (r.$listeners$ = e[3]), O.propChangeCallback && (r.$watchers$ = So(t.$watchers$), r.$deserializers$ = t.$deserializers$, r.$serializers$ = t.$serializers$), O.reflect && (r.$attrsToReflect$ = []), O.shadowDom && !si && r.$flags$ & 1, !(r.$flags$ & 1) && r.$flags$ & 256 ? O.experimentalSlotFixes || (O.slotChildNodesFix, O.cloneNodeFix, O.appendChildSlotFix, O.scopedSlotTextContentFix && r.$flags$ & 2) : O.cloneNodeFix, O.hydrateClientSide && O.shadowDom;
    const i = t.prototype.connectedCallback, o = t.prototype.disconnectedCallback;
    return Object.assign(t.prototype, {
      __hasHostListenerAttached: !1,
      __registerHost() {
        un(this, r);
      },
      connectedCallback() {
        if (!this.__hasHostListenerAttached) {
          const s = te(this);
          if (!s)
            return;
          ko(this, s, r.$listeners$, !1), this.__hasHostListenerAttached = !0;
        }
        tl(this), i && i.call(this);
      },
      disconnectedCallback() {
        il(this), o && o.call(this);
      },
      __attachShadow() {
        if (si) {
          if (!this.shadowRoot)
            bn.call(this, r);
          else if (this.shadowRoot.mode !== "open")
            throw new Error(
              `Unable to re-use existing shadow root for ${r.$tagName$}! Mode is set to ${this.shadowRoot.mode} but Stencil only supports open shadow roots.`
            );
        }
      }
    }), Object.defineProperty(t, "is", {
      value: r.$tagName$,
      configurable: !0
    }), Qn(
      t,
      r,
      3
      /* proxyState */
    );
  } catch (i) {
    return we(i), t;
  }
}, ko = (t, e, r, i) => {
  r && D.document && r.map(([o, s, n]) => {
    const l = sl(D.document, t, o), a = ol(e, n), c = nl(o);
    j.ael(l, s, a, c), (e.$rmListeners$ = e.$rmListeners$ || []).push(() => j.rel(l, s, a, c));
  });
}, ol = (t, e) => (r) => {
  var i;
  try {
    O.lazyLoad || t.$hostElement$[e](r);
  } catch (o) {
    we(o, t.$hostElement$);
  }
}, sl = (t, e, r) => r & 4 ? t : r & 8 ? D : r & 16 ? t.body : e, nl = (t) => fn ? {
  passive: (t & 1) !== 0,
  capture: (t & 2) !== 0
} : (t & 2) !== 0;
var Po = typeof global == "object" && global && global.Object === Object && global, ll = typeof self == "object" && self && self.Object === Object && self, V = Po || ll || Function("return this")(), he = V.Symbol, jo = Object.prototype, al = jo.hasOwnProperty, cl = jo.toString, Ge = he ? he.toStringTag : void 0, dl = Object.prototype.toString, vi = he ? he.toStringTag : void 0;
function Me(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : vi && vi in Object(t) ? (function(e) {
    var r = al.call(e, Ge), i = e[Ge];
    try {
      e[Ge] = void 0;
      var o = !0;
    } catch {
    }
    var s = cl.call(e);
    return o && (r ? e[Ge] = i : delete e[Ge]), s;
  })(t) : (function(e) {
    return dl.call(e);
  })(t);
}
function ue(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function Ie(t) {
  return t != null && typeof t == "object";
}
function me(t) {
  return typeof t == "symbol" || Ie(t) && Me(t) == "[object Symbol]";
}
var hl = /\s/, ul = /^\s+/, gl = /^[-+]0x[0-9a-f]+$/i, pl = /^0b[01]+$/i, fl = /^0o[0-7]+$/i, vl = parseInt;
function ar(t) {
  if (typeof t == "number") return t;
  if (me(t)) return NaN;
  if (ue(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = ue(e) ? e + "" : e;
  }
  if (typeof t != "string") return t === 0 ? t : +t;
  var r;
  t = (r = t) ? r.slice(0, (function(o) {
    for (var s = o.length; s-- && hl.test(o.charAt(s)); ) ;
    return s;
  })(r) + 1).replace(ul, "") : r;
  var i = pl.test(t);
  return i || fl.test(t) ? vl(t.slice(2), i ? 2 : 8) : gl.test(t) ? NaN : +t;
}
var mi, T, cr;
(function(t) {
  t[t.MOUSE_LEFT = 1] = "MOUSE_LEFT", t[t.MOUSE_RIGHT = 3] = "MOUSE_RIGHT", t[t.MOUSE_MIDDLE = 2] = "MOUSE_MIDDLE", t[t.BACKSPACE = 8] = "BACKSPACE", t[t.COMMA = 188] = "COMMA", t[t.INSERT = 45] = "INSERT", t[t.DELETE = 46] = "DELETE", t[t.END = 35] = "END", t[t.ENTER = 13] = "ENTER", t[t.ESCAPE = 27] = "ESCAPE", t[t.CONTROL = 17] = "CONTROL", t[t.COMMAND_LEFT = 91] = "COMMAND_LEFT", t[t.COMMAND_RIGHT = 93] = "COMMAND_RIGHT", t[t.COMMAND_FIREFOX = 224] = "COMMAND_FIREFOX", t[t.ALT = 18] = "ALT", t[t.HOME = 36] = "HOME", t[t.PAGE_DOWN = 34] = "PAGE_DOWN", t[t.PAGE_UP = 33] = "PAGE_UP", t[t.PERIOD = 190] = "PERIOD", t[t.SPACE = 32] = "SPACE", t[t.SHIFT = 16] = "SHIFT", t[t.CAPS_LOCK = 20] = "CAPS_LOCK", t[t.TAB = 9] = "TAB", t[t.ARROW_RIGHT = 39] = "ARROW_RIGHT", t[t.ARROW_LEFT = 37] = "ARROW_LEFT", t[t.ARROW_UP = 38] = "ARROW_UP", t[t.ARROW_DOWN = 40] = "ARROW_DOWN", t[t.F1 = 112] = "F1", t[t.F2 = 113] = "F2", t[t.F3 = 114] = "F3", t[t.F4 = 115] = "F4", t[t.F5 = 116] = "F5", t[t.F6 = 117] = "F6", t[t.F7 = 118] = "F7", t[t.F8 = 119] = "F8", t[t.F9 = 120] = "F9", t[t.F10 = 121] = "F10", t[t.F11 = 122] = "F11", t[t.F12 = 123] = "F12", t[t.A = 65] = "A", t[t.C = 67] = "C", t[t.D = 68] = "D", t[t.F = 70] = "F", t[t.L = 76] = "L", t[t.O = 79] = "O", t[t.P = 80] = "P", t[t.S = 83] = "S", t[t.V = 86] = "V", t[t.X = 88] = "X";
})(mi || (mi = {})), (function(t) {
  t.ENTER = "Enter", t.ENTER_NUM = "NumpadEnter", t.A = "KeyA", t.C = "KeyC", t.X = "KeyX", t.V = "KeyV", t.ESCAPE = "Escape", t.TAB = "Tab", t.BACKSPACE = "Backspace", t.DELETE = "Delete", t.ARROW_RIGHT = "ArrowRight", t.ARROW_LEFT = "ArrowLeft", t.ARROW_UP = "ArrowUp", t.ARROW_DOWN = "ArrowDown", t.SHIFT = "Shift";
})(T || (T = {})), (function(t) {
  t.ENTER = "Enter", t.TAB = "Tab";
})(cr || (cr = {}));
var yi;
(function(t) {
  t.mac = "Mac";
})(yi || (yi = {}));
const ml = (t) => ({ set(e, r) {
  if (e !== "proxyItems") return;
  const i = t.get("items").reduce(((s, n) => (s.add(n), s)), /* @__PURE__ */ new Set()), o = r.reduce(((s, n) => (i.has(n) && s.push(n), s)), []);
  t.set("items", o);
} });
function kr(t, e) {
  return t === e || t != t && e != e;
}
function ct(t, e) {
  for (var r = t.length; r--; ) if (kr(t[r][0], e)) return r;
  return -1;
}
var yl = Array.prototype.splice;
function J(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var i = t[e];
    this.set(i[0], i[1]);
  }
}
function Lo(t) {
  if (!ue(t)) return !1;
  var e = Me(t);
  return e == "[object Function]" || e == "[object GeneratorFunction]" || e == "[object AsyncFunction]" || e == "[object Proxy]";
}
J.prototype.clear = function() {
  this.__data__ = [], this.size = 0;
}, J.prototype.delete = function(t) {
  var e = this.__data__, r = ct(e, t);
  return !(r < 0 || (r == e.length - 1 ? e.pop() : yl.call(e, r, 1), --this.size, 0));
}, J.prototype.get = function(t) {
  var e = this.__data__, r = ct(e, t);
  return r < 0 ? void 0 : e[r][1];
}, J.prototype.has = function(t) {
  return ct(this.__data__, t) > -1;
}, J.prototype.set = function(t, e) {
  var r = this.__data__, i = ct(r, t);
  return i < 0 ? (++this.size, r.push([t, e])) : r[i][1] = e, this;
};
var bi, Ht = V["__core-js_shared__"], Si = (bi = /[^.]+$/.exec(Ht && Ht.keys && Ht.keys.IE_PROTO || "")) ? "Symbol(src)_1." + bi : "", bl = Function.prototype.toString;
function xe(t) {
  if (t != null) {
    try {
      return bl.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Sl = /^\[object .+?Constructor\]$/, wl = RegExp("^" + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function Ne(t, e) {
  var r = (function(i, o) {
    return i?.[o];
  })(t, e);
  return (function(i) {
    return !(!ue(i) || (o = i, Si && Si in o)) && (Lo(i) ? wl : Sl).test(xe(i));
    var o;
  })(r) ? r : void 0;
}
var Qe = Ne(V, "Map"), Xe = Ne(Object, "create"), xl = Object.prototype.hasOwnProperty, Cl = Object.prototype.hasOwnProperty;
function fe(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var i = t[e];
    this.set(i[0], i[1]);
  }
}
function dt(t, e) {
  var r, i, o = t.__data__;
  return ((i = typeof (r = e)) == "string" || i == "number" || i == "symbol" || i == "boolean" ? r !== "__proto__" : r === null) ? o[typeof e == "string" ? "string" : "hash"] : o.map;
}
function q(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var i = t[e];
    this.set(i[0], i[1]);
  }
}
function Z(t) {
  var e = this.__data__ = new J(t);
  this.size = e.size;
}
function ft(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new q(); ++e < r; ) this.add(t[e]);
}
function $l(t, e) {
  for (var r = -1, i = t == null ? 0 : t.length; ++r < i; ) if (e(t[r], r, t)) return !0;
  return !1;
}
function wi(t, e, r, i, o, s) {
  var n = 1 & r, l = t.length, a = e.length;
  if (l != a && !(n && a > l)) return !1;
  var c = s.get(t), d = s.get(e);
  if (c && d) return c == e && d == t;
  var h = -1, u = !0, g = 2 & r ? new ft() : void 0;
  for (s.set(t, e), s.set(e, t); ++h < l; ) {
    var p = t[h], v = e[h];
    if (i) var y = n ? i(v, p, h, e, t, s) : i(p, v, h, t, e, s);
    if (y !== void 0) {
      if (y) continue;
      u = !1;
      break;
    }
    if (g) {
      if (!$l(e, (function(w, x) {
        if (!g.has(x) && (p === w || o(p, w, r, i, s))) return g.push(x);
      }))) {
        u = !1;
        break;
      }
    } else if (p !== v && !o(p, v, r, i, s)) {
      u = !1;
      break;
    }
  }
  return s.delete(t), s.delete(e), u;
}
fe.prototype.clear = function() {
  this.__data__ = Xe ? Xe(null) : {}, this.size = 0;
}, fe.prototype.delete = function(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}, fe.prototype.get = function(t) {
  var e = this.__data__;
  if (Xe) {
    var r = e[t];
    return r === "__lodash_hash_undefined__" ? void 0 : r;
  }
  return xl.call(e, t) ? e[t] : void 0;
}, fe.prototype.has = function(t) {
  var e = this.__data__;
  return Xe ? e[t] !== void 0 : Cl.call(e, t);
}, fe.prototype.set = function(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Xe && e === void 0 ? "__lodash_hash_undefined__" : e, this;
}, q.prototype.clear = function() {
  this.size = 0, this.__data__ = { hash: new fe(), map: new (Qe || J)(), string: new fe() };
}, q.prototype.delete = function(t) {
  var e = dt(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}, q.prototype.get = function(t) {
  return dt(this, t).get(t);
}, q.prototype.has = function(t) {
  return dt(this, t).has(t);
}, q.prototype.set = function(t, e) {
  var r = dt(this, t), i = r.size;
  return r.set(t, e), this.size += r.size == i ? 0 : 1, this;
}, Z.prototype.clear = function() {
  this.__data__ = new J(), this.size = 0;
}, Z.prototype.delete = function(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}, Z.prototype.get = function(t) {
  return this.__data__.get(t);
}, Z.prototype.has = function(t) {
  return this.__data__.has(t);
}, Z.prototype.set = function(t, e) {
  var r = this.__data__;
  if (r instanceof J) {
    var i = r.__data__;
    if (!Qe || i.length < 199) return i.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new q(i);
  }
  return r.set(t, e), this.size = r.size, this;
}, ft.prototype.add = ft.prototype.push = function(t) {
  return this.__data__.set(t, "__lodash_hash_undefined__"), this;
}, ft.prototype.has = function(t) {
  return this.__data__.has(t);
};
var xi = V.Uint8Array;
function Rl(t) {
  var e = -1, r = Array(t.size);
  return t.forEach((function(i, o) {
    r[++e] = [o, i];
  })), r;
}
function Ol(t) {
  var e = -1, r = Array(t.size);
  return t.forEach((function(i) {
    r[++e] = i;
  })), r;
}
var Ci = he ? he.prototype : void 0, Mt = Ci ? Ci.valueOf : void 0, H = Array.isArray, zl = Object.prototype.propertyIsEnumerable, $i = Object.getOwnPropertySymbols, El = $i ? function(t) {
  return t == null ? [] : (t = Object(t), (function(e) {
    for (var r = -1, i = e == null ? 0 : e.length, o = 0, s = []; ++r < i; ) {
      var n = e[r];
      zl.call(t, n) && (s[o++] = n);
    }
    return s;
  })($i(t)));
} : function() {
  return [];
};
function Ri(t) {
  return Ie(t) && Me(t) == "[object Arguments]";
}
var Fo = Object.prototype, Dl = Fo.hasOwnProperty, Tl = Fo.propertyIsEnumerable, Io = Ri(/* @__PURE__ */ (function() {
  return arguments;
})()) ? Ri : function(t) {
  return Ie(t) && Dl.call(t, "callee") && !Tl.call(t, "callee");
}, _o = typeof exports == "object" && exports && !exports.nodeType && exports, Oi = _o && typeof module == "object" && module && !module.nodeType && module, zi = Oi && Oi.exports === _o ? V.Buffer : void 0, dr = (zi ? zi.isBuffer : void 0) || function() {
  return !1;
}, kl = /^(?:0|[1-9]\d*)$/;
function Pr(t, e) {
  var r = typeof t;
  return !!(e = e ?? 9007199254740991) && (r == "number" || r != "symbol" && kl.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function jr(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= 9007199254740991;
}
var E = {};
E["[object Float32Array]"] = E["[object Float64Array]"] = E["[object Int8Array]"] = E["[object Int16Array]"] = E["[object Int32Array]"] = E["[object Uint8Array]"] = E["[object Uint8ClampedArray]"] = E["[object Uint16Array]"] = E["[object Uint32Array]"] = !0, E["[object Arguments]"] = E["[object Array]"] = E["[object ArrayBuffer]"] = E["[object Boolean]"] = E["[object DataView]"] = E["[object Date]"] = E["[object Error]"] = E["[object Function]"] = E["[object Map]"] = E["[object Number]"] = E["[object Object]"] = E["[object RegExp]"] = E["[object Set]"] = E["[object String]"] = E["[object WeakMap]"] = !1;
var Ei, Ao = typeof exports == "object" && exports && !exports.nodeType && exports, Ye = Ao && typeof module == "object" && module && !module.nodeType && module, Nt = Ye && Ye.exports === Ao && Po.process, Di = (function() {
  try {
    return Ye && Ye.require && Ye.require("util").types || Nt && Nt.binding && Nt.binding("util");
  } catch {
  }
})(), Ti = Di && Di.isTypedArray, Ho = Ti ? (Ei = Ti, function(t) {
  return Ei(t);
}) : function(t) {
  return Ie(t) && jr(t.length) && !!E[Me(t)];
}, Pl = Object.prototype.hasOwnProperty, jl = Object.prototype, Ll = /* @__PURE__ */ (function(t, e) {
  return function(r) {
    return t(e(r));
  };
})(Object.keys, Object), Fl = Object.prototype.hasOwnProperty;
function Lr(t) {
  return t != null && jr(t.length) && !Lo(t);
}
function Fr(t) {
  return Lr(t) ? (function(e) {
    var r = H(e), i = !r && Io(e), o = !r && !i && dr(e), s = !r && !i && !o && Ho(e), n = r || i || o || s, l = n ? (function(d, h) {
      for (var u = -1, g = Array(d); ++u < d; ) g[u] = h(u);
      return g;
    })(e.length, String) : [], a = l.length;
    for (var c in e) !Pl.call(e, c) || n && (c == "length" || o && (c == "offset" || c == "parent") || s && (c == "buffer" || c == "byteLength" || c == "byteOffset") || Pr(c, a)) || l.push(c);
    return l;
  })(t) : (function(e) {
    if ((r = e) !== (typeof (i = r && r.constructor) == "function" && i.prototype || jl)) return Ll(e);
    var r, i, o = [];
    for (var s in Object(e)) Fl.call(e, s) && s != "constructor" && o.push(s);
    return o;
  })(t);
}
function ki(t) {
  return (function(e, r, i) {
    var o = Fr(e);
    return H(e) ? o : (function(s, n) {
      for (var l = -1, a = n.length, c = s.length; ++l < a; ) s[c + l] = n[l];
      return s;
    })(o, i(e));
  })(t, 0, El);
}
var Il = Object.prototype.hasOwnProperty, hr = Ne(V, "DataView"), ur = Ne(V, "Promise"), gr = Ne(V, "Set"), pr = Ne(V, "WeakMap"), Pi = "[object Map]", ji = "[object Promise]", Li = "[object Set]", Fi = "[object WeakMap]", Ii = "[object DataView]", _l = xe(hr), Al = xe(Qe), Hl = xe(ur), Ml = xe(gr), Nl = xe(pr), ne = Me;
(hr && ne(new hr(new ArrayBuffer(1))) != Ii || Qe && ne(new Qe()) != Pi || ur && ne(ur.resolve()) != ji || gr && ne(new gr()) != Li || pr && ne(new pr()) != Fi) && (ne = function(t) {
  var e = Me(t), r = e == "[object Object]" ? t.constructor : void 0, i = r ? xe(r) : "";
  if (i) switch (i) {
    case _l:
      return Ii;
    case Al:
      return Pi;
    case Hl:
      return ji;
    case Ml:
      return Li;
    case Nl:
      return Fi;
  }
  return e;
});
var _i = "[object Arguments]", Ai = "[object Array]", ht = "[object Object]", Hi = Object.prototype.hasOwnProperty;
function Ir(t, e, r, i, o) {
  return t === e || (t == null || e == null || !Ie(t) && !Ie(e) ? t != t && e != e : (function(s, n, l, a, c, d) {
    var h = H(s), u = H(n), g = h ? Ai : ne(s), p = u ? Ai : ne(n), v = (g = g == _i ? ht : g) == ht, y = (p = p == _i ? ht : p) == ht, w = g == p;
    if (w && dr(s)) {
      if (!dr(n)) return !1;
      h = !0, v = !1;
    }
    if (w && !v) return d || (d = new Z()), h || Ho(s) ? wi(s, n, l, a, c, d) : (function(R, z, ie, N, Be, B, K) {
      switch (ie) {
        case "[object DataView]":
          if (R.byteLength != z.byteLength || R.byteOffset != z.byteOffset) return !1;
          R = R.buffer, z = z.buffer;
        case "[object ArrayBuffer]":
          return !(R.byteLength != z.byteLength || !B(new xi(R), new xi(z)));
        case "[object Boolean]":
        case "[object Date]":
        case "[object Number]":
          return kr(+R, +z);
        case "[object Error]":
          return R.name == z.name && R.message == z.message;
        case "[object RegExp]":
        case "[object String]":
          return R == z + "";
        case "[object Map]":
          var oe = Rl;
        case "[object Set]":
          if (oe || (oe = Ol), R.size != z.size && !(1 & N)) return !1;
          var $e = K.get(R);
          if ($e) return $e == z;
          N |= 2, K.set(R, z);
          var Re = wi(oe(R), oe(z), N, Be, B, K);
          return K.delete(R), Re;
        case "[object Symbol]":
          if (Mt) return Mt.call(R) == Mt.call(z);
      }
      return !1;
    })(s, n, g, l, a, c, d);
    if (!(1 & l)) {
      var x = v && Hi.call(s, "__wrapped__"), S = y && Hi.call(n, "__wrapped__");
      if (x || S) {
        var b = x ? s.value() : s, $ = S ? n.value() : n;
        return d || (d = new Z()), c(b, $, l, a, d);
      }
    }
    return !!w && (d || (d = new Z()), (function(R, z, ie, N, Be, B) {
      var K = 1 & ie, oe = ki(R), $e = oe.length;
      if ($e != ki(z).length && !K) return !1;
      for (var Re = $e; Re--; ) {
        var pe = oe[Re];
        if (!(K ? pe in z : Il.call(z, pe))) return !1;
      }
      var Jr = B.get(R), Zr = B.get(z);
      if (Jr && Zr) return Jr == z && Zr == R;
      var it = !0;
      B.set(R, z), B.set(z, R);
      for (var _t = K; ++Re < $e; ) {
        var ot = R[pe = oe[Re]], st = z[pe];
        if (N) var Qr = K ? N(st, ot, pe, z, R, B) : N(ot, st, pe, R, z, B);
        if (!(Qr === void 0 ? ot === st || Be(ot, st, ie, N, B) : Qr)) {
          it = !1;
          break;
        }
        _t || (_t = pe == "constructor");
      }
      if (it && !_t) {
        var nt = R.constructor, lt = z.constructor;
        nt == lt || !("constructor" in R) || !("constructor" in z) || typeof nt == "function" && nt instanceof nt && typeof lt == "function" && lt instanceof lt || (it = !1);
      }
      return B.delete(R), B.delete(z), it;
    })(s, n, l, a, c, d));
  })(t, e, r, i, Ir, o));
}
function Mo(t) {
  return t == t && !ue(t);
}
function No(t, e) {
  return function(r) {
    return r != null && r[t] === e && (e !== void 0 || t in Object(r));
  };
}
var Bl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Wl = /^\w*$/;
function _r(t, e) {
  if (H(t)) return !1;
  var r = typeof t;
  return !(r != "number" && r != "symbol" && r != "boolean" && t != null && !me(t)) || Wl.test(t) || !Bl.test(t) || e != null && t in Object(e);
}
function Ar(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError("Expected a function");
  var r = function() {
    var i = arguments, o = e ? e.apply(this, i) : i[0], s = r.cache;
    if (s.has(o)) return s.get(o);
    var n = t.apply(this, i);
    return r.cache = s.set(o, n) || s, n;
  };
  return r.cache = new (Ar.Cache || q)(), r;
}
Ar.Cache = q;
var Bt, Wt, Ul = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Gl = /\\(\\)?/g, Xl = (Bt = Ar((function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Ul, (function(r, i, o, s) {
    e.push(o ? s.replace(Gl, "$1") : i || r);
  })), e;
}), (function(t) {
  return Wt.size === 500 && Wt.clear(), t;
})), Wt = Bt.cache, Bt), Mi = he ? he.prototype : void 0, Ni = Mi ? Mi.toString : void 0;
function Bo(t) {
  if (typeof t == "string") return t;
  if (H(t)) return (function(r, i) {
    for (var o = -1, s = r == null ? 0 : r.length, n = Array(s); ++o < s; ) n[o] = i(r[o], o, r);
    return n;
  })(t, Bo) + "";
  if (me(t)) return Ni ? Ni.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function Wo(t, e) {
  return H(t) ? t : _r(t, e) ? [t] : Xl((function(r) {
    return r == null ? "" : Bo(r);
  })(t));
}
function $t(t) {
  if (typeof t == "string" || me(t)) return t;
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function Uo(t, e) {
  for (var r = 0, i = (e = Wo(e, t)).length; t != null && r < i; ) t = t[$t(e[r++])];
  return r && r == i ? t : void 0;
}
function Vl(t, e) {
  return t != null && e in Object(t);
}
function Kl(t, e) {
  return _r(t) && Mo(e) ? No($t(t), e) : function(r) {
    var i = (function(o, s) {
      var n = o == null ? void 0 : Uo(o, s);
      return n === void 0 ? void 0 : n;
    })(r, t);
    return i === void 0 && i === e ? (function(o, s) {
      return o != null && (function(n, l, a) {
        for (var c = -1, d = (l = Wo(l, n)).length, h = !1; ++c < d; ) {
          var u = $t(l[c]);
          if (!(h = n != null && a(n, u))) break;
          n = n[u];
        }
        return h || ++c != d ? h : !!(d = n == null ? 0 : n.length) && jr(d) && Pr(u, d) && (H(n) || Io(n));
      })(o, s, Vl);
    })(r, t) : Ir(e, i, 3);
  };
}
function Hr(t) {
  return t;
}
function Go(t) {
  return typeof t == "function" ? t : t == null ? Hr : typeof t == "object" ? H(t) ? Kl(t[0], t[1]) : (o = (function(s) {
    for (var n = Fr(s), l = n.length; l--; ) {
      var a = n[l], c = s[a];
      n[l] = [a, c, Mo(c)];
    }
    return n;
  })(i = t), o.length == 1 && o[0][2] ? No(o[0][0], o[0][1]) : function(s) {
    return s === i || (function(n, l, a) {
      var c = a.length, d = c;
      if (n == null) return !d;
      for (n = Object(n); c--; ) {
        var h = a[c];
        if (h[2] ? h[1] !== n[h[0]] : !(h[0] in n)) return !1;
      }
      for (; ++c < d; ) {
        var u = (h = a[c])[0], g = n[u];
        if (h[2]) {
          if (g === void 0 && !(u in n)) return !1;
        } else if (!Ir(h[1], g, 3, void 0, new Z())) return !1;
      }
      return !0;
    })(s, 0, o);
  }) : _r(e = t) ? (r = $t(e), function(s) {
    return s?.[r];
  }) : /* @__PURE__ */ (function(s) {
    return function(n) {
      return Uo(n, s);
    };
  })(e);
  var e, r, i, o;
}
var Yl = 1 / 0;
function vt(t) {
  return t ? (t = ar(t)) === Yl || t === -1 / 0 ? 17976931348623157e292 * (t < 0 ? -1 : 1) : t == t ? t : 0 : t === 0 ? t : 0;
}
var ql = Math.ceil, Jl = Math.max;
function Xo(t, e, r) {
  if (!ue(r)) return !1;
  var i = typeof e;
  return !!(i == "number" ? Lr(r) && Pr(e, r.length) : i == "string" && e in r) && kr(r[e], t);
}
const Bi = /* @__PURE__ */ (() => {
  let t;
  return (...e) => {
    t && clearTimeout(t), t = setTimeout((() => {
      t = 0, ((r) => {
        for (let i of r.keys()) {
          const o = r.get(i).filter(((s) => {
            const n = s.deref();
            return n && (!("isConnected" in (l = n)) || l.isConnected);
            var l;
          }));
          r.set(i, o);
        }
      })(...e);
    }), 2e3);
  };
})(), Wi = Yn, Ui = Vn, Ut = (t, e) => {
  const r = t.indexOf(e);
  r >= 0 && (t[r] = t[t.length - 1], t.length--);
}, jt = (t, e) => {
  const r = ((i, o = (s, n) => s !== n) => {
    const s = () => {
      return (typeof (S = i) == "function" ? S() : S) ?? {};
      var S;
    }, n = s();
    let l = new Map(Object.entries(n));
    const a = typeof Proxy < "u", c = a ? null : {}, d = { dispose: [], get: [], set: [], reset: [] }, h = /* @__PURE__ */ new Map(), u = () => {
      l = new Map(Object.entries(s())), a || x(), d.reset.forEach(((S) => S()));
    }, g = (S) => (d.get.forEach(((b) => b(S))), l.get(S)), p = (S, b) => {
      const $ = l.get(S);
      o(b, $, S) && (l.set(S, b), a || w(S), d.set.forEach(((R) => R(S, b, $))));
    }, v = a ? new Proxy(n, { get: (S, b) => g(b), ownKeys: () => Array.from(l.keys()), getOwnPropertyDescriptor: () => ({ enumerable: !0, configurable: !0 }), has: (S, b) => l.has(b), set: (S, b, $) => (p(b, $), !0) }) : (x(), c), y = (S, b) => (d[S].push(b), () => {
      Ut(d[S], b);
    });
    function w(S) {
      !a && c && (Object.prototype.hasOwnProperty.call(c, S) || Object.defineProperty(c, S, { configurable: !0, enumerable: !0, get: () => g(S), set(b) {
        p(S, b);
      } }));
    }
    function x() {
      if (a || !c) return;
      const S = new Set(l.keys());
      for (const b of Object.keys(c)) S.has(b) || delete c[b];
      for (const b of S) w(b);
    }
    return { state: v, get: g, set: p, on: y, onChange: (S, b) => {
      const $ = (N, Be) => {
        N === S && b(Be);
      }, R = () => {
        const N = s();
        b(N[S]);
      }, z = y("set", $), ie = y("reset", R);
      return h.set(b, { setHandler: $, resetHandler: R, propName: S }), () => {
        z(), ie(), h.delete(b);
      };
    }, use: (...S) => {
      const b = S.reduce((($, R) => (R.set && $.push(y("set", R.set)), R.get && $.push(y("get", R.get)), R.reset && $.push(y("reset", R.reset)), R.dispose && $.push(y("dispose", R.dispose)), $)), []);
      return () => b.forEach((($) => $()));
    }, dispose: () => {
      d.dispose.forEach(((S) => S())), u();
    }, reset: u, forceUpdate: (S) => {
      const b = l.get(S);
      d.set.forEach((($) => $(S, b, b)));
    }, removeListener: (S, b) => {
      const $ = h.get(b);
      $ && $.propName === S && (Ut(d.set, $.setHandler), Ut(d.reset, $.resetHandler), h.delete(b));
    } };
  })(t, e);
  return r.use((() => {
    if (typeof Ui != "function" || typeof Wi != "function") return {};
    const i = Wi, o = Ui, s = /* @__PURE__ */ new Map();
    return { dispose: () => s.clear(), get: (n) => {
      const l = o();
      l && ((a, c, d) => {
        let h = a.get(c);
        h || (h = [], a.set(c, h)), h.some(((u) => u.deref() === d)) || h.push(new WeakRef(d));
      })(s, n, l);
    }, set: (n) => {
      const l = s.get(n);
      if (l) {
        const a = l.filter(((c) => {
          const d = c.deref();
          return !!d && i(d);
        }));
        s.set(n, a);
      }
      Bi(s);
    }, reset: () => {
      s.forEach(((n) => {
        n.forEach(((l) => {
          const a = l.deref();
          a && i(a);
        }));
      })), Bi(s);
    } };
  })()), r;
}, Zl = (t) => ({ set(e, r) {
  if (e === "trimmed") {
    const i = t.get("proxyItems"), o = Mr(r), s = i.filter(((n) => !o[n]));
    t.set("items", s);
  }
} });
function Mr(t) {
  const e = {};
  for (let r in t) for (let i in t[r]) e[i] = e[i] || t[r][i];
  return e;
}
function P(t, e) {
  for (const r of Object.keys(e)) t.set(r, e[r]);
}
class Rt {
  get store() {
    return this.dataStore;
  }
  constructor(e, r) {
    const i = this.dataStore = jt(Object.assign({ items: [], proxyItems: [], source: [], groupingDepth: 0, groups: {}, type: e, trimmed: {}, groupingCustomRenderer: void 0 }, r));
    i.use(ml(i)), i.use(Zl(i));
  }
  updateData(e, r, i = !1, o = !1) {
    const s = this.store.get("trimmed"), n = i && o ? Mr(s) : null;
    i || this.store.set("trimmed", {}), this.store.set("items", []);
    const l = (a = 0, c = e?.length || 0, d && typeof d != "number" && Xo(a, c, d) && (c = d = void 0), a = vt(a), c === void 0 ? (c = a, a = 0) : c = vt(c), (function(h, u, g) {
      for (var p = -1, v = Jl(ql((u - h) / (g || 1)), 0), y = Array(v); v--; ) y[++p] = h, h += g;
      return y;
    })(a, c, d = d === void 0 ? a < c ? 1 : -1 : vt(d)));
    var a, c, d;
    P(this.store, { source: e, proxyItems: [...l] }), this.store.set("items", n ? l.filter(((h) => !n[h])) : l), r && P(this.store, { groupingDepth: r.depth, groups: r.groups, groupingCustomRenderer: r.customRenderer });
  }
  addTrimmed(e) {
    let r = this.store.get("trimmed");
    r = Object.assign(Object.assign({}, r), e), P(this.store, { trimmed: r });
  }
  setSourceData(e, r = !0) {
    Vo(this.store, e, r);
  }
  setData(e) {
    const r = Object.assign({}, e);
    P(this.store, r);
  }
  refresh() {
    const e = this.store.get("source");
    this.store.set("source", [...e]);
  }
}
function Ql(t, e) {
  return t.get("items")[e];
}
function Lt(t) {
  const e = t.get("source");
  return t.get("items").map(((r) => e[r]));
}
const _ = (t, e) => t.get("source")[ea(t, e)], ea = (t, e) => t.get("items")[e];
function Vo(t, e, r = !0) {
  const i = t.get("items"), o = t.get("source");
  for (let s in e) o[i[s]] = e[s];
  r && t.set("source", [...o]);
}
function ta(t, e, r = !0) {
  const i = t.get("source");
  for (let o in e) i[o] = e[o];
  r && t.set("source", [...i]);
}
function ra(t, e) {
  t.set("items", e);
}
function ia(t, e) {
  const r = t.get("items"), i = (o = t.get("source")) != null && o.length ? (function(s, n) {
    for (var l = s.length, a = -1; ++a < l; ) if (n(s[a], a, s)) return a;
    return -1;
  })(o, Go({ prop: e })) : -1;
  var o;
  return r.indexOf(i);
}
const Ko = 30, Yo = 40, qo = "data-rgCol", Jo = "data-rgRow", oa = "disabled", sa = "rgCell", Gt = "rowHeaders", Zo = "rgHeaderCell", na = "sortable", Gi = "header-rgRow", la = "actual-rgRow", aa = "revo-drag-icon", ca = "revo-draggable", Qo = "focused-cell", da = "selection-border-range", Le = "mobile-handler", ha = "temp-bg-range", ua = "autofill-handle", es = "edit-input-wrapper", ga = "Draggable item", ge = "__rvgr", se = "focused-rgRow";
function qe(t) {
  var e = vt(t), r = e % 1;
  return e == e ? r ? e - r : e : 0;
}
function pa(t, e, r, i) {
  var o = -1, s = t == null ? 0 : t.length;
  for (i && s && (r = t[++o]); ++o < s; ) r = e(r, t[o], o, t);
  return r;
}
var Xi, ts = (Xi = function(t, e) {
  return t && (function(r, i, o) {
    for (var s = -1, n = Object(r), l = o(r), a = l.length; a--; ) {
      var c = l[++s];
      if (i(n[c], c, n) === !1) break;
    }
    return r;
  })(t, e, Fr);
}, function(t, e) {
  if (t == null) return t;
  if (!Lr(t)) return Xi(t, e);
  for (var r = t.length, i = -1, o = Object(t); ++i < r && e(o[i], i, o) !== !1; ) ;
  return t;
});
function fa(t, e, r, i, o) {
  return o(t, (function(s, n, l) {
    r = i ? (i = !1, s) : e(r, s, n, l);
  })), r;
}
function de(t, e, r) {
  var i = H(t) ? pa : fa, o = arguments.length < 3;
  return i(t, Go(e), r, o, ts);
}
function Ot(t) {
  return t ?? "";
}
function et(t = {}, e) {
  if (e) return e.cellParser ? e.cellParser(t, e) : t[e.prop];
}
function rs(t, e) {
  return Ot(et(t, e));
}
function fr(t) {
  return t.pin ? t.pin : "rgCol";
}
function va(t) {
  const e = {};
  for (const [r, i] of t.entries()) i.size && (e[r] = i.size);
  return e;
}
function Nr(t) {
  return !!t.children;
}
function is(t, e = 0, r, i) {
  return de(t, ((o, s) => {
    var n;
    if (Nr(s)) return ma(o, s, is(s.children, e + 1, r, o), i?.columns, e);
    const l = Object.assign(Object.assign({}, s.columnType && r?.[s.columnType]), s);
    return l.pin ? o.columns[l.pin].push(l) : o.columns.rgCol.push(l), l.order && (o.sort[l.prop] = l), o.columnByProp[l.prop] || (o.columnByProp[l.prop] = []), o.columnByProp[l.prop].push(l), (n = l.beforeSetup) === null || n === void 0 || n.call(l, l), o;
  }), { columns: { rgCol: [], colPinStart: [], colPinEnd: [] }, columnByProp: {}, columnGrouping: { rgCol: [], colPinStart: [], colPinEnd: [] }, sort: {}, maxLevel: e });
}
function ma(t, e, r, i, o = 0) {
  const s = Object.assign(Object.assign({}, e), { level: o, indexes: [] });
  k.forEach(((n) => {
    const l = t.columns[n], a = r.columns[n];
    if (H(l) && H(a)) {
      const c = a.length;
      if (c) {
        const d = [...i?.[n] || [], ...l].length;
        l.push(...a), t.columnGrouping[n].push(Object.assign(Object.assign({}, s), { indexes: Array(c).fill(d).map(((h, u) => h + u)) }));
      }
    }
  }));
  for (let n in r.columnGrouping) {
    const l = n, a = r.columnGrouping[l], c = (i?.[l] || []).length, d = c > 0 ? a.map(((h) => Object.assign(Object.assign({}, h), { indexes: h.indexes.map(((u) => u + c)) }))) : a;
    t.columnGrouping[l].push(...d);
  }
  return t.maxLevel = Math.max(t.maxLevel, r.maxLevel), t.sort = Object.assign(Object.assign({}, t.sort), r.sort), t.columnByProp = Object.assign(Object.assign({}, t.columnByProp), r.columnByProp), t;
}
function os(t, e) {
  for (const r of t) if (Nr(r)) {
    const i = os(r.children, e);
    if (i) return i;
  } else if (r.prop === e) return r;
}
function vr(t, e) {
  return os(t, e);
}
function ya(t, e) {
  const r = {};
  let i = ["x", "y"];
  for (let o of i) if (t[o] < 0) return r[o] = t[o], r;
  for (let o of i) if (t[o] >= e[o]) return r[o] = t[o] - e[o], r;
  return null;
}
function Vi(t, e) {
  const r = Object.assign({}, t), i = ["x", "y"];
  for (const o of i) t[o] < 0 ? r[o] = 0 : t[o] >= e[o] && (r[o] = e[o] - 1);
  return r;
}
function Q(t, e) {
  return t && e ? { x: Math.min(t.x, e.x), y: Math.min(t.y, e.y), x1: Math.max(t.x, e.x), y1: Math.max(t.y, e.y) } : null;
}
function Ki(t) {
  return t.x === t.x1 && t.y === t.y1;
}
const G = ["rowPinStart", "rgRow", "rowPinEnd"], k = ["colPinStart", "rgCol", "colPinEnd"];
function ba(t) {
  return G.indexOf(t) > -1;
}
const Se = `${ge}-depth`, Ft = `${ge}-name`, Br = `${ge}-id`, zt = `${ge}-value`, mr = `${ge}-column`, _e = `${ge}-expanded`, mt = `${ge}-prop`, ss = `${ge}-original-index`, Sa = "group-expand", ns = "groupexpandclick", Xt = "rgRow";
function wa(t, e) {
  return t[e] || null;
}
function ls(t) {
  return t != null;
}
function Oe(t, e, r = !1) {
  let i = 0;
  const o = { source: [], prevExpanded: {}, oldNewIndexes: {} };
  return e.forEach(((s) => {
    const n = t[s];
    if (r) if (F(n)) as(n) && (o.prevExpanded[n[zt]] = !0);
    else {
      if (!ls(n)) return;
      o.source.push(n), o.oldNewIndexes[s] = i, i++;
    }
    else o.source.push(n);
  })), o;
}
function as(t = {}) {
  return t[_e];
}
function cs({ groupedValues: t, parentIds: e, isExpanded: r, itemIndex: i, expandedAll: o, prevExpanded: s, columnProps: n }) {
  const l = e.length, a = [];
  let c = {}, d = {};
  return t.forEach(((h, u) => {
    const g = [...e, u], p = g.join(","), v = r && (!!o || !!s[p]);
    if (a.push({ [Ft]: u, [Se]: l, [Br]: JSON.stringify(g), [zt]: p, [_e]: v, [mt]: n[l], [n[l]]: u }), i += 1, !r && l && (c[i] = !0), Array.isArray(h)) h.forEach(((y) => {
      i += 1, v || (c[i] = !0), d[y[ss]] = i;
    })), a.push(...h);
    else {
      const y = cs({ groupedValues: h, parentIds: g, isExpanded: v, itemIndex: i, expandedAll: o, prevExpanded: s, columnProps: n });
      a.push(...y.source), c = Object.assign(Object.assign({}, y.trimmed), c), d = Object.assign(Object.assign({}, y.oldNewIndexMap), d), i = y.itemIndex;
    }
  })), { source: a, oldNewIndexMap: d, trimmed: c, itemIndex: i };
}
function Yi(t, e, { prevExpanded: r = {}, expandedAll: i = !1, getGroupValue: o = wa }) {
  const s = /* @__PURE__ */ new Map();
  t.forEach(((d, h) => {
    if (!ls(d)) return;
    const u = e.map(((v) => o(d, v))), g = u.pop();
    let p = s;
    u.forEach(((v) => {
      p.has(v) || p.set(v, /* @__PURE__ */ new Map()), p = p.get(v);
    })), p.has(g) || p.set(g, []), p.get(g).push(Object.assign(Object.assign({}, d), { [ss]: h }));
  }));
  const n = e.length, { source: l, trimmed: a, oldNewIndexMap: c } = cs({ groupedValues: s, parentIds: [], isExpanded: !0, itemIndex: -1, expandedAll: i, prevExpanded: r, columnProps: e });
  return { sourceWithGroups: l, depth: n, trimmed: a, oldNewIndexMap: c };
}
function xa(t) {
  return t?.[Ft];
}
function F(t) {
  return t?.[Ft] !== void 0;
}
function ds(t) {
  return t?.[mr] !== void 0;
}
function Ca(t, e) {
  const r = t.length;
  let i = 0;
  for (; i < r; i++) if (t[i] !== e[i]) return i;
  return i;
}
function hs(t) {
  const e = JSON.parse(t);
  return Array.isArray(e) ? e : null;
}
function $a(t, e, r) {
  const i = hs(r[Br]);
  if (!i) return !1;
  const o = Ca(t, i);
  return e[Se] < o;
}
function Ra(t, e = {}) {
  const r = t?.editor;
  if (r) return typeof r == "string" ? e[r] : r;
}
class us {
  get columns() {
    return Lt(this.source);
  }
  constructor(e, r) {
    this.dataStore = e, this.source = r, this.unsubscribe = [], this.hasGrouping = !1, this.unsubscribe.push(r.onChange("source", ((i) => this.checkGrouping(i)))), this.checkGrouping(r.get("source")), this.type = r.get("type");
  }
  checkGrouping(e) {
    for (let r of e) {
      if (ds(r)) return void (this.hasGrouping = !0);
      this.hasGrouping = !1;
    }
  }
  isReadOnly(e, r) {
    var i;
    const o = (i = this.columns[r]) === null || i === void 0 ? void 0 : i.readonly;
    return typeof o == "function" ? o(this.rowDataModel(e, r)) : !!o;
  }
  mergeProperties(e, r, i, o) {
    var s, n;
    const l = Object.assign({}, i);
    l.class = Object.assign(Object.assign({}, typeof l.class == "string" ? { [l.class]: !0 } : l.class), { [sa]: !0, [oa]: this.isReadOnly(e, r) });
    const a = (n = (s = o.column) === null || s === void 0 ? void 0 : s.cellProperties) === null || n === void 0 ? void 0 : n.call(s, o);
    return a ? gs(l, a) : l;
  }
  getRowClass(e, r) {
    return (_(this.dataStore, e) || {})[r] || "";
  }
  getSaveData(e, r, i) {
    const o = this.rowDataModel(e, r);
    return i === void 0 && (i = Ot(o.value)), Object.assign(Object.assign({}, o), { val: i });
  }
  rowDataModel(e, r) {
    const i = this.columns[r], o = i?.prop, s = _(this.dataStore, e) || {}, n = this.dataStore.get("type");
    return { prop: o, model: s, data: this.dataStore.get("source"), column: i, rowIndex: e, colIndex: r, colType: this.type, type: n, value: et(s, i) };
  }
  getRangeData(e, r) {
    var i;
    const o = {}, s = e.oldRange.x1 - e.oldRange.x + 1, n = e.oldRange.y1 - e.oldRange.y + 1, l = {};
    for (let a = e.newRange.y, c = 0; a < e.newRange.y1 + 1; a++, c++) {
      const d = e.oldRange.y + c % n, h = _(this.dataStore, d) || {};
      for (let u = e.newRange.x, g = 0; u < e.newRange.x1 + 1; u++, g++) {
        if (a >= e.oldRange.y && a <= e.oldRange.y1 && u >= e.oldRange.x && u <= e.oldRange.x1 || !this.columns[u]) continue;
        const p = (i = this.columns[u]) === null || i === void 0 ? void 0 : i.prop, v = e.oldRange.x + g % s, y = r[v].prop;
        this.isReadOnly(a, u) || (o[a] || (o[a] = {}), o[a][p] = h[y], l[a] || (l[a] = {}), l[a][p] = { colIndex: v, colProp: y, rowIndex: d });
      }
    }
    return { changed: o, mapping: l };
  }
  getTransformedDataToApply({ start: e, data: r, targetRange: i }) {
    const o = {}, s = r.length;
    if (!s) return { changed: o, range: null };
    const n = this.columns.length, l = this.dataStore.get("items").length, a = this.getDataApplyBounds(e, i, s, l, n);
    if (!a) return { changed: o, range: null };
    const { startRow: c, startCol: d, endRow: h } = a;
    let u = d - 1, g = c - 1;
    for (let p = c, v = 0; p <= h; p++, v++) {
      const y = r[v % s], w = y?.length || 0;
      w && (u = Math.max(u, this.applyClipboardRow(o, { bounds: a, copyColLength: w, copyRow: y, rowIndex: p, start: e, targetRange: i })), g = p);
    }
    return { changed: o, range: this.getAppliedRange(a, g, u) };
  }
  getDataApplyBounds(e, r, i, o, s) {
    var n, l, a;
    const c = (n = r?.y) !== null && n !== void 0 ? n : e.y, d = (l = r?.x) !== null && l !== void 0 ? l : e.x, h = Math.min(o - 1, (a = r?.y1) !== null && a !== void 0 ? a : e.y + i - 1);
    return h < c || d >= s ? null : { startRow: c, startCol: d, endRow: h, colLength: s };
  }
  applyClipboardRow(e, { bounds: r, copyColLength: i, copyRow: o, rowIndex: s, start: n, targetRange: l }) {
    var a;
    const c = Math.min(r.colLength - 1, (a = l?.x1) !== null && a !== void 0 ? a : n.x + i - 1);
    for (let d = r.startCol, h = 0; d <= c; d++, h++) {
      if (this.isReadOnly(s, d)) continue;
      const u = this.columns[d].prop;
      e[s] = e[s] || {}, e[s][u] = o[h % i];
    }
    return c;
  }
  getAppliedRange({ startRow: e, startCol: r }, i, o) {
    return i < e || o < r ? null : Q({ x: r, y: e }, { y: i, x: o });
  }
  getRangeStaticData(e, r) {
    const i = {};
    for (let o = e.y, s = 0; o < e.y1 + 1; o++, s++) for (let n = e.x, l = 0; n < e.x1 + 1; n++, l++) {
      if (!this.columns[n]) continue;
      const a = this.columns[n].prop;
      this.isReadOnly(o, n) || (i[o] || (i[o] = {}), i[o][a] = r);
    }
    return i;
  }
  getRangeTransformedToProps(e, r) {
    var i;
    const o = [], s = this.dataStore.get("type");
    for (let n = e.y, l = 0; n < e.y1 + 1; n++, l++) for (let a = e.x, c = 0; a < e.x1 + 1; a++, c++) {
      const d = (i = this.columns[a]) === null || i === void 0 ? void 0 : i.prop;
      o.push({ prop: d, rowIndex: n, colIndex: a, model: _(r, n), type: s, colType: this.type });
    }
    return o;
  }
  copyRangeArray(e, r) {
    const i = (n = [...this.columns], l = e.x, a = e.x1 + 1, c = n == null ? 0 : n.length, c ? (a && typeof a != "number" && Xo(n, l, a) ? (l = 0, a = c) : (l = l == null ? 0 : qe(l), a = a === void 0 ? c : qe(a)), (function(d, h, u) {
      var g = -1, p = d.length;
      h < 0 && (h = -h > p ? 0 : p + h), (u = u > p ? p : u) < 0 && (u += p), p = h > u ? 0 : u - h >>> 0, h >>>= 0;
      for (var v = Array(p); ++g < p; ) v[g] = d[g + h];
      return v;
    })(n, l, a)) : []).map(((d) => d.prop)), o = [], s = {};
    var n, l, a, c;
    for (let d = e.y; d <= e.y1; d++) {
      const h = [];
      s[d] = {};
      for (let u of i) {
        const g = _(r, d);
        if (!g) continue;
        const p = g[u];
        h.push(p), s[d][u] = p;
      }
      o.push(h);
    }
    return { data: o, mapping: s };
  }
  destroy() {
    this.unsubscribe.forEach(((e) => e()));
  }
}
function Oa(t, e) {
  return typeof t == "function" ? t(e) : !!t;
}
function qi(t = {}, e = {}) {
  return typeof t == "string" && (t = { [t]: !0 }), typeof e == "string" && (e = { [e]: !0 }), Object.assign(Object.assign({}, t), e);
}
function gs(t, e) {
  e.className && (e.class = qi(e.class, e.className), delete e.className);
  let r = Object.assign(Object.assign({}, e), t);
  return e.class && (r.class = qi(r.class, e.class)), e.style && (r.style = Object.assign(Object.assign({}, e.style), r.style)), r;
}
var Vt = function() {
  return V.Date.now();
}, za = Math.max, Ea = Math.min;
function Ce(t, e, r) {
  var i, o, s, n, l, a, c = 0, d = !1, h = !1, u = !0;
  if (typeof t != "function") throw new TypeError("Expected a function");
  function g(x) {
    var S = i, b = o;
    return i = o = void 0, c = x, n = t.apply(b, S);
  }
  function p(x) {
    var S = x - a;
    return a === void 0 || S >= e || S < 0 || h && x - c >= s;
  }
  function v() {
    var x = Vt();
    if (p(x)) return y(x);
    l = setTimeout(v, (function(S) {
      var b = e - (S - a);
      return h ? Ea(b, s - (S - c)) : b;
    })(x));
  }
  function y(x) {
    return l = void 0, u && i ? g(x) : (i = o = void 0, n);
  }
  function w() {
    var x = Vt(), S = p(x);
    if (i = arguments, o = this, a = x, S) {
      if (l === void 0) return (function(b) {
        return c = b, l = setTimeout(v, e), d ? g(b) : n;
      })(a);
      if (h) return clearTimeout(l), l = setTimeout(v, e), g(a);
    }
    return l === void 0 && (l = setTimeout(v, e)), n;
  }
  return e = ar(e) || 0, ue(r) && (d = !!r.leading, s = (h = "maxWait" in r) ? za(ar(r.maxWait) || 0, e) : s, u = "trailing" in r ? !!r.trailing : u), w.cancel = function() {
    l !== void 0 && clearTimeout(l), c = 0, i = a = o = l = void 0;
  }, w.flush = function() {
    return l === void 0 ? n : y(Vt());
  }, w;
}
const Ji = 16e6, yr = 1e6;
let ze;
function Da(t = typeof document > "u" ? void 0 : document) {
  if (typeof ze == "number") return ze;
  const e = t?.body;
  if (e) {
    const r = e.ownerDocument, i = r.createElement("div");
    i.style.cssText = ["height:1px", "left:-10000px", "overflow:scroll", "position:absolute", "top:-10000px", "visibility:hidden", "width:1px"].join(";");
    const o = r.createElement("div");
    return o.style.height = "64000000px", i.appendChild(o), e.appendChild(i), ze = Math.max(0, Math.min(i.scrollHeight, 64e6) - yr), i.remove(), ze > yr || (ze = Ji), ze;
  }
  return Ji;
}
function Wr({ contentSize: t, clientSize: e, virtualSize: r = 0, maxScrollSize: i = Da() }) {
  const o = Math.max(0, i - yr), s = Math.max(0, t), n = Math.max(0, e), l = Math.max(0, r || n), a = Math.max(0, s - l), c = Math.max(0, o - n), d = Math.min(a, c), h = a > d && d > 0, u = (v) => Math.min(Math.max(0, v || 0), a), g = (v) => Math.min(Math.max(0, v || 0), d), p = (v) => a && d ? g(h ? u(v) / a * d : v) : 0;
  return { contentSize: s, clientSize: n, viewportSize: l, physicalContentSize: n + d, logicalScrollSize: a, physicalScrollSize: d, isCompressed: h, toLogicalCoordinate: (v) => a && d ? u(h ? g(v) / d * a : v) : 0, toPhysicalCoordinate: p, getRenderOffset(v) {
    const y = u(v);
    return y - p(y);
  } };
}
const Zi = { contentSize: 0, clientSize: 0, virtualSize: 0, maxSize: 0 }, Ee = -1;
function br(t, e, r = 0) {
  return Wr({ contentSize: t, clientSize: e, virtualSize: r }).physicalContentSize;
}
let ps = class {
  constructor(e) {
    this.cfg = e, this.preventArtificialScroll = { rgRow: null, rgCol: null }, this.previousScroll = { rgRow: Ee, rgCol: Ee }, this.previousLogicalScroll = { rgRow: 0, rgCol: 0 }, this.params = { rgRow: Object.assign({}, Zi), rgCol: Object.assign({}, Zi) };
  }
  setParams(e, r) {
    const i = Wr(e), o = i.physicalContentSize;
    this.params[r] = Object.assign(Object.assign({}, e), { maxSize: o - e.clientSize, virtualContentSize: o, scrollDimension: i });
  }
  async setScroll(e) {
    this.cancelScroll(e.dimension);
    const r = new Promise(((i, o) => {
      if (this.cfg.skipAnimationFrame) return i();
      const s = window.requestAnimationFrame((() => {
        i();
      }));
      this.preventArtificialScroll[e.dimension] = o.bind(null, s);
    }));
    try {
      await r;
      const i = this.getParams(e.dimension);
      e.coordinate = Math.ceil(e.coordinate), this.previousLogicalScroll[e.dimension] = this.wrapLogicalCoordinate(e.coordinate, i);
      const o = this.toPhysicalCoordinate(e.coordinate, i);
      this.previousScroll[e.dimension] = this.wrapPhysicalCoordinate(o, i), this.preventArtificialScroll[e.dimension] = null, this.cfg.applyScroll(Object.assign(Object.assign({}, e), { coordinate: o }));
    } catch (i) {
      window.cancelAnimationFrame(i);
    }
  }
  async setScrollByDelta(e, r) {
    var i;
    const o = this.getParams(e.dimension), s = this.previousScroll[e.dimension] === Ee ? this.toLogicalCoordinate(r, o) : this.previousLogicalScroll[e.dimension], n = this.wrapLogicalCoordinate(s + ((i = e.delta) !== null && i !== void 0 ? i : 0), o), l = Object.assign(Object.assign({}, e), { coordinate: n });
    return await this.setScroll(l), l;
  }
  scroll(e, r, i = !1, o, s = !1) {
    if (this.cancelScroll(r), !i && this.previousScroll[r] === e) return void (this.previousScroll[r] = Ee);
    const n = this.getParams(r), l = this.toLogicalScrollCoordinate(e, r, n, o);
    this.cfg.runScroll({ dimension: r, coordinate: l, delta: o, outside: s }), this.previousLogicalScroll[r] = l;
  }
  getParams(e) {
    return this.params[e];
  }
  wrapPhysicalCoordinate(e, r) {
    return e < 0 ? Ee : typeof r.maxSize == "number" && e > r.maxSize ? r.maxSize : e;
  }
  wrapLogicalCoordinate(e, r) {
    var i, o;
    return e < 0 ? 0 : Math.min(e, (o = (i = r.scrollDimension) === null || i === void 0 ? void 0 : i.logicalScrollSize) !== null && o !== void 0 ? o : e);
  }
  cancelScroll(e) {
    var r, i;
    (i = (r = this.preventArtificialScroll)[e]) === null || i === void 0 || i.call(r), this.preventArtificialScroll[e] = null;
  }
  toLogicalScrollCoordinate(e, r, i, o) {
    const s = i.scrollDimension;
    if (!s) return e;
    if (typeof o == "number" && s.isCompressed) {
      const n = this.previousScroll[r] === Ee ? s.toLogicalCoordinate(e - o) : this.previousLogicalScroll[r];
      return s.toLogicalCoordinate(s.toPhysicalCoordinate(n + o));
    }
    return s.toLogicalCoordinate(e);
  }
  toPhysicalCoordinate(e, r) {
    var i, o;
    return (o = (i = r.scrollDimension) === null || i === void 0 ? void 0 : i.toPhysicalCoordinate(e)) !== null && o !== void 0 ? o : e;
  }
  toLogicalCoordinate(e, r) {
    var i, o;
    return (o = (i = r.scrollDimension) === null || i === void 0 ? void 0 : i.toLogicalCoordinate(e)) !== null && o !== void 0 ? o : e;
  }
}, fs = class {
  constructor(e = 10) {
    this.scrollThrottling = e, this.mouseWheelScrollTimestamp = { rgCol: 0, rgRow: 0 }, this.lastKnownScrollCoordinate = { rgCol: 0, rgRow: 0 }, this.lastScrollUpdateCallbacks = {};
  }
  setCoordinate(e) {
    this.lastKnownScrollCoordinate[e.dimension] = e.coordinate;
  }
  setCoordinateFromScroll(e) {
    this.setCoordinate(e), this.mouseWheelScrollTimestamp[e.dimension] = 0;
  }
  latestScrollUpdate(e) {
    this.mouseWheelScrollTimestamp[e] = (/* @__PURE__ */ new Date()).getTime();
  }
  isReady(e, r) {
    return this.lastScrollUpdateCallbacks[e] && this.clearLastScrollUpdate(e), this.verifyChange(e, r);
  }
  verifyChange(e, r) {
    return (/* @__PURE__ */ new Date()).getTime() - this.mouseWheelScrollTimestamp[e] > this.scrollThrottling && r !== this.lastKnownScrollCoordinate[e];
  }
  clearLastScrollUpdate(e) {
    var r, i;
    clearTimeout((i = (r = this.lastScrollUpdateCallbacks[e]) === null || r === void 0 ? void 0 : r.timeout) !== null && i !== void 0 ? i : 0), delete this.lastScrollUpdateCallbacks[e];
  }
  throttleLastScrollUpdate(e, r, i) {
    if (this.scrollThrottling) {
      this.clearLastScrollUpdate(e);
      const o = this.lastScrollUpdateCallbacks[e] = { callback: i, timestamp: (/* @__PURE__ */ new Date()).getTime(), coordinate: r, timeout: 0 };
      o.timeout = setTimeout((() => {
        this.clearLastScrollUpdate(e), this.mouseWheelScrollTimestamp[e] < o.timestamp && this.verifyChange(e, o.coordinate) && o.callback();
      }), this.scrollThrottling + 50);
    }
  }
};
var Ta = Math.floor, ka = Math.min;
function vs(t, e) {
  return (function(r, i) {
    var o = 0, s = r == null ? o : r.length;
    if (typeof i == "number" && i == i && s <= 2147483647) {
      for (; o < s; ) {
        var n = o + s >>> 1, l = r[n];
        l !== null && !me(l) && l < i ? o = n + 1 : s = n;
      }
      return s;
    }
    return (function(a, c, d) {
      var h = 0, u = a == null ? 0 : a.length;
      if (u === 0) return 0;
      for (var g = (c = d(c)) != c, p = c === null, v = me(c), y = c === void 0; h < u; ) {
        var w = Ta((h + u) / 2), x = d(a[w]), S = x !== void 0, b = x === null, $ = x == x, R = me(x);
        if (g) var z = $;
        else z = y ? $ && S : p ? $ && S && !b : v ? $ && S && !b && !R : !b && !R && x < c;
        z ? h = w + 1 : u = w;
      }
      return ka(u, 4294967294);
    })(r, i, Hr);
  })(t, e);
}
function Pa(t, e = {}) {
  const r = [], i = {}, o = {}, s = Object.keys(e).map(Number).sort(((l, a) => l - a));
  let n;
  for (let l = 0; l < s.length; l++) {
    const a = s[l], c = { itemIndex: a, start: 0, end: 0 };
    c.start = n ? (a - n.itemIndex - 1) * t + n.end : a * t, c.end = c.start + e[a], r.push(c.start), o[a] = i[l] = c, n = c;
  }
  return { indexes: s, positionIndexes: [...r], positionIndexToItem: Object.assign({}, i), indexToItem: o };
}
const ee = ({ indexes: t, positionIndexes: e, originItemSize: r, positionIndexToItem: i }, o) => {
  const s = { itemIndex: 0, start: 0, end: 0 }, n = t.length ? vs(e, o) : 0;
  if (!n) return s.itemIndex = Math.floor(o / r), s.start = s.itemIndex * r, s.end = s.start + r, s;
  const l = i[n - 1];
  if (l.end > o) return l;
  const a = Math.floor((o - l.end) / r);
  return s.itemIndex = l.itemIndex + 1 + a, s.start = l.end + a * r, s.end = s.start + r, s;
};
function ae(t, e) {
  let r = { itemIndex: e, start: 0, end: 0 };
  if (t.indexToItem[e]) return t.indexToItem[e];
  const i = t.indexes.length ? vs(t.indexes, e) : 0;
  if (!i) return r.start = r.itemIndex * t.originItemSize, r.end = r.start + t.originItemSize, r;
  const o = t.indexToItem[t.indexes[i - 1]];
  return r.start = o.end + (e - o.itemIndex - 1) * t.originItemSize, r.end = r.start + t.originItemSize, r;
}
function ms(t, e, r) {
  var i = !0, o = !0;
  if (typeof t != "function") throw new TypeError("Expected a function");
  return ue(r) && (i = "leading" in r ? !!r.leading : i, o = "trailing" in r ? !!r.trailing : o), Ce(t, e, { leading: i, maxWait: e, trailing: o });
}
const It = "header", ys = "footer", bs = "content", ja = "data";
function La(t, e) {
  return { x: t.viewports[t.colType].store.get("realCount"), y: t.viewports[e].store.get("realCount") };
}
function Fa(t, e, r, i) {
  return { colData: t.colStore, viewportCol: t.viewports[t.colType].store, viewportRow: t.viewports[e].store, lastCell: La(t, e), slot: r, type: e, canDrag: !i, position: t.position, dataStore: t.rowStores[e].store, dimensionCol: t.dimensions[t.colType].store, dimensionRow: t.dimensions[e].store, style: i ? { height: `${t.dimensions[e].store.get("realSize")}px` } : void 0 };
}
let Ia = class {
  constructor(e, r, i) {
    this.resize = r, this.resizeObserver = null, this.previousSize = { width: 0, height: 0 }, this.apply = ms(((s) => {
      var n;
      const l = { width: s.width, height: s.height };
      (n = this.resize) === null || n === void 0 || n.call(this, l, this.previousSize), this.previousSize = l;
    }), 40, { leading: !1, trailing: !0 });
    const o = [];
    i.forEach(((s) => {
      s && o.push(s);
    })), this.init(e, o);
  }
  init(e, r = []) {
    const i = this.resizeObserver = new ResizeObserver(((o) => {
      o.length && this.apply(o[0].target === e ? o[0].contentRect : e.getBoundingClientRect());
    }));
    i.observe(e), r.forEach(((o) => {
      i.observe(o);
    }));
  }
  destroy() {
    var e;
    this.apply.cancel(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), this.resizeObserver = null;
  }
};
const _a = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.scrollViewport = m(this, "scrollviewport", 7), this.resizeViewport = m(this, "resizeviewport", 7), this.scrollchange = m(this, "scrollchange", 7), this.silentScroll = m(this, "scrollviewportsilent", 7), this.contentWidth = 0, this.contentHeight = 0, this.noHorizontalScrollTransfer = !1;
  }
  async setScroll(t) {
    var e;
    this.localScrollTimer.latestScrollUpdate(t.dimension), (e = this.localScrollService) === null || e === void 0 || e.setScroll(t);
  }
  async changeScroll(t, e = !1) {
    var r, i, o, s;
    if (!e) {
      if (t.delta) {
        let n = 0;
        switch (t.dimension) {
          case "rgCol":
            n = this.horizontalScroll.scrollLeft;
            break;
          case "rgRow":
            n = (i = (r = this.verticalScroll) === null || r === void 0 ? void 0 : r.scrollTop) !== null && i !== void 0 ? i : 0;
        }
        return (s = (o = this.localScrollService) === null || o === void 0 ? void 0 : o.setScrollByDelta(t, n)) !== null && s !== void 0 ? s : t;
      }
      return t;
    }
    t.coordinate && this.verticalScroll && t.dimension === "rgRow" && (this.verticalScroll.style.transform = `translateY(${-1 * t.coordinate}px)`);
  }
  mousewheelVertical({ detail: t }) {
    this.verticalMouseWheel(t);
  }
  mousewheelHorizontal({ detail: t }) {
    this.horizontalMouseWheel(t);
  }
  scrollApply({ detail: { type: t, coordinate: e } }) {
    this.applyOnScroll(t, e, !0);
  }
  connectedCallback() {
    this.verticalMouseWheel = this.onVerticalMouseWheel.bind(this, "rgRow", "deltaY"), this.horizontalMouseWheel = this.onHorizontalMouseWheel.bind(this, "rgCol", "deltaX"), this.localScrollTimer = new fs("ontouchstart" in document.documentElement ? 0 : 10), this.localScrollService = new ps({ runScroll: (t) => this.scrollViewport.emit(t), applyScroll: (t) => {
      switch (this.localScrollTimer.setCoordinate(t), t.dimension) {
        case "rgCol":
          this.horizontalScroll.scrollLeft = t.coordinate;
          break;
        case "rgRow":
          this.verticalScroll && (this.verticalScroll.scrollTop = t.coordinate, this.verticalScroll.style.transform && (this.verticalScroll.style.transform = ""));
      }
    } });
  }
  componentDidLoad() {
    this.resizeService = new Ia(this.horizontalScroll, ((t) => {
      var e, r, i, o, s, n, l, a;
      const c = {};
      let d = t.height || 0;
      d && (d -= ((r = (e = this.header) === null || e === void 0 ? void 0 : e.clientHeight) !== null && r !== void 0 ? r : 0) + ((o = (i = this.footer) === null || i === void 0 ? void 0 : i.clientHeight) !== null && o !== void 0 ? o : 0)), c.rgRow = { size: d, contentSize: this.contentHeight, scroll: (n = (s = this.verticalScroll) === null || s === void 0 ? void 0 : s.scrollTop) !== null && n !== void 0 ? n : 0, noScroll: !1 };
      const h = t.width || 0;
      c.rgCol = { size: h, contentSize: this.contentWidth, scroll: this.horizontalScroll.scrollLeft, noScroll: this.colType !== "rgCol" }, this.setScrollParams({ rgRow: d, rgCol: h });
      const u = ["rgCol", "rgRow"];
      for (const g of u) {
        const p = c[g];
        p && (this.resizeViewport.emit({ dimension: g, size: p.size, rowHeader: this.rowHeader }), p.noScroll || ((l = this.localScrollService) === null || l === void 0 || l.scroll((a = p.scroll) !== null && a !== void 0 ? a : 0, g, !0), this.setScrollVisibility(g, p.size, p.contentSize)));
      }
    }), [this.footer, this.header]);
  }
  setScrollVisibility(t, e, r) {
    const i = e < r;
    let o;
    switch (t) {
      case "rgCol":
        o = this.horizontalScroll;
        break;
      case "rgRow":
        o = this.verticalScroll;
    }
    i ? o?.classList.add(`scroll-${t}`) : o?.classList.remove(`scroll-${t}`), this.scrollchange.emit({ type: t, hasScroll: i });
  }
  disconnectedCallback() {
    var t;
    (t = this.resizeService) === null || t === void 0 || t.destroy();
  }
  async componentDidRender() {
    var t, e, r, i;
    this.setScrollParams({ rgRow: (e = (t = this.verticalScroll) === null || t === void 0 ? void 0 : t.clientHeight) !== null && e !== void 0 ? e : 0, rgCol: this.horizontalScroll.clientWidth }), this.setScrollVisibility("rgRow", (i = (r = this.verticalScroll) === null || r === void 0 ? void 0 : r.clientHeight) !== null && i !== void 0 ? i : 0, this.contentHeight), this.setScrollVisibility("rgCol", this.horizontalScroll.clientWidth, this.contentWidth);
  }
  setScrollParams(t) {
    this.localScrollService.setParams({ contentSize: this.contentHeight, clientSize: t.rgRow, virtualSize: 0 }, "rgRow"), this.localScrollService.setParams({ contentSize: this.contentWidth, clientSize: t.rgCol, virtualSize: 0 }, "rgCol");
  }
  render() {
    var t, e;
    const r = (e = (t = this.verticalScroll) === null || t === void 0 ? void 0 : t.clientHeight) !== null && e !== void 0 ? e : 0, i = this.contentHeight < r ? Math.max(this.contentHeight, 0) : br(this.contentHeight, r), o = br(this.contentWidth, 0);
    return f(M, { key: "3dd9d29cf26743d7aa4995f51180d56008526e54", onWheel: this.horizontalMouseWheel, onScroll: (s) => this.applyScroll("rgCol", s) }, f("div", { key: "af75428e845044c33eba2fecd1ec04a9177b9b5c", class: "inner-content-table", style: { width: `${o}px` } }, f("div", { key: "a0149f597588371e1fafe69efc3bd4411379a017", class: "header-wrapper", ref: (s) => this.header = s }, f("slot", { key: "e5d2570bf93897cd97ef702141c83bb8c0e13ee2", name: It })), f("div", { key: "d1388ff0d721dd8ce925b934bb2128fddc1ac17b", class: "vertical-inner", ref: (s) => this.verticalScroll = s, onWheel: this.verticalMouseWheel, onScroll: (s) => this.applyScroll("rgRow", s) }, f("div", { key: "a306ff56f62279402e2a881a081e3224341d5bdf", class: "content-wrapper", style: { height: `${i}px` } }, f("slot", { key: "898bda8e9429da06c9ff2bd41626ac27f3cde3cc", name: bs }))), f("div", { key: "5e9eba1edd5fca07a964971054a7900e4dd84099", class: "footer-wrapper", ref: (s) => this.footer = s }, f("slot", { key: "f233ad1c23b3f692c45e1db235cfef4704a80726", name: ys }))));
  }
  async applyScroll(t, e) {
    if (!(e.target instanceof L)) return;
    let r = 0;
    switch (t) {
      case "rgCol":
        r = e.target.scrollLeft;
        break;
      case "rgRow":
        r = e.target.scrollTop;
    }
    r < 0 ? this.silentScroll.emit({ dimension: t, coordinate: r }) : this.applyOnScroll(t, r);
  }
  applyOnScroll(t, e, r = !1) {
    const i = () => {
      var o;
      (o = this.localScrollService) === null || o === void 0 || o.scroll(e, t, void 0, void 0, r), this.localScrollTimer.setCoordinateFromScroll({ dimension: t, coordinate: e });
    };
    this.localScrollTimer.isReady(t, e) ? i() : this.localScrollTimer.throttleLastScrollUpdate(t, e, (() => i()));
  }
  onVerticalMouseWheel(t, e, r) {
    var i, o, s, n, l, a, c, d;
    const h = (o = (i = this.verticalScroll) === null || i === void 0 ? void 0 : i.scrollTop) !== null && o !== void 0 ? o : 0;
    h + ((n = (s = this.verticalScroll) === null || s === void 0 ? void 0 : s.clientHeight) !== null && n !== void 0 ? n : 0) >= ((a = (l = this.verticalScroll) === null || l === void 0 ? void 0 : l.scrollHeight) !== null && a !== void 0 ? a : 0) && r.deltaY > 0 || h === 0 && r.deltaY < 0 || (c = r.preventDefault) === null || c === void 0 || c.call(r), (d = this.localScrollService) === null || d === void 0 || d.scroll(h + r[e], t, void 0, r[e]), this.localScrollTimer.latestScrollUpdate(t);
  }
  onHorizontalMouseWheel(t, e, r) {
    var i, o, s, n;
    if (!r.deltaX) return;
    const { scrollLeft: l, scrollWidth: a, clientWidth: c } = this.horizontalScroll, d = l + c >= a && r.deltaX > 0, h = l === 0 && r.deltaX < 0;
    if (this.noHorizontalScrollTransfer) {
      if (!d && !h) {
        const u = l + r[e];
        (i = r.preventDefault) === null || i === void 0 || i.call(r), this.horizontalScroll.scrollLeft = u, (o = this.localScrollService) === null || o === void 0 || o.scroll(this.horizontalScroll.scrollLeft, t, void 0, r[e]), this.localScrollTimer.latestScrollUpdate(t);
      }
    } else d || h || (s = r.preventDefault) === null || s === void 0 || s.call(r), (n = this.localScrollService) === null || n === void 0 || n.scroll(l + r[e], t, void 0, r[e]), this.localScrollTimer.latestScrollUpdate(t);
  }
  get horizontalScroll() {
    return this;
  }
  static get style() {
    return ".rowHeaders{z-index:2;font-size:10px;display:flex;height:100%}.rowHeaders revogr-data .rgCell{text-align:center}.rowHeaders .rgCell{padding:0 1em !important;min-width:100%}revogr-viewport-scroll{-ms-overflow-style:none;scrollbar-width:none;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;position:relative;z-index:1;height:100%}revogr-viewport-scroll::-webkit-scrollbar{display:none;-webkit-appearance:none}revogr-viewport-scroll.colPinStart,revogr-viewport-scroll.colPinEnd{z-index:2}revogr-viewport-scroll.colPinEnd:has(.active){overflow:visible}revogr-viewport-scroll.rgCol{flex-grow:1}revogr-viewport-scroll .content-wrapper{overflow:hidden}revogr-viewport-scroll .inner-content-table{display:flex;flex-direction:column;max-height:100%;width:100%;min-width:100%;position:relative;z-index:0}revogr-viewport-scroll .vertical-inner{overflow-y:auto;position:relative;width:100%;flex-grow:1;outline:none;-ms-overflow-style:none;scrollbar-width:none;}revogr-viewport-scroll .vertical-inner::-webkit-scrollbar{display:none;-webkit-appearance:none}revogr-viewport-scroll .vertical-inner revogr-data,revogr-viewport-scroll .vertical-inner revogr-overlay-selection{height:100%}";
  }
}, [260, "revogr-viewport-scroll", { rowHeader: [4, "row-header"], contentWidth: [2, "content-width"], contentHeight: [2, "content-height"], colType: [1, "col-type"], noHorizontalScrollTransfer: [4, "no-horizontal-scroll-transfer"], setScroll: [64], changeScroll: [64], applyScroll: [64] }, [[0, "mousewheel-vertical", "mousewheelVertical"], [0, "mousewheel-horizontal", "mousewheelHorizontal"], [0, "scroll-coordinate", "scrollApply"]]]);
function Ss() {
  typeof customElements < "u" && ["revogr-viewport-scroll"].forEach(((t) => {
    t === "revogr-viewport-scroll" && (customElements.get(t) || customElements.define(t, _a));
  }));
}
const Aa = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.html = m(this, "html", 7), this.redraw = null, this.vnodes = [];
  }
  componentDidRender() {
    this.html.emit({ html: this.el.innerHTML, vnodes: this.vnodes });
  }
  render() {
    var t, e;
    return this.vnodes = (e = (t = this.redraw) === null || t === void 0 ? void 0 : t.call(this)) !== null && e !== void 0 ? e : null, f(M, { key: "11b76ca8a86ebf279add88bbd86ef9eb5149605a", style: { visibility: "hidden", position: "absolute" } }, this.vnodes);
  }
  get el() {
    return this;
  }
}, [0, "vnode-html", { redraw: [16] }]);
function Ur() {
  typeof customElements < "u" && ["vnode-html"].forEach(((t) => {
    t === "vnode-html" && (customElements.get(t) || customElements.define(t, Aa));
  }));
}
const ws = (t, e) => {
  var { rowClass: r, index: i, size: o, start: s, depth: n, groupingLevel: l } = t, a = (function(d, h) {
    var u = {};
    for (var g in d) Object.prototype.hasOwnProperty.call(d, g) && h.indexOf(g) < 0 && (u[g] = d[g]);
    if (d != null && typeof Object.getOwnPropertySymbols == "function") {
      var p = 0;
      for (g = Object.getOwnPropertySymbols(d); p < g.length; p++) h.indexOf(g[p]) < 0 && Object.prototype.propertyIsEnumerable.call(d, g[p]) && (u[g[p]] = d[g[p]]);
    }
    return u;
  })(t, ["rowClass", "index", "size", "start", "depth", "groupingLevel"]);
  const c = Object.assign(Object.assign(Object.assign({}, a), { [Jo]: i }), typeof l == "number" ? { "data-level": l } : {});
  return f("div", Object.assign({}, c, { class: `rgRow ${r || ""}`, style: { height: `${o}px`, transform: `translateY(${s}px)`, paddingLeft: n ? 10 * n + "px" : void 0 } }), e);
};
function Qi(t, e, r) {
  var i;
  const o = new CustomEvent(ns, { detail: { model: e, virtualIndex: r }, cancelable: !0, bubbles: !0 });
  (i = t.target) === null || i === void 0 || i.dispatchEvent(o);
}
const Ha = (t) => {
  const { model: e, itemIndex: r, hasExpand: i, groupingCustomRenderer: o } = t, s = e[Ft], n = e[_e], l = parseInt(e[Se], 10) || 0;
  return f(ws, Object.assign({}, t, { rowClass: "groupingRow", depth: l, expanded: n }), o ? f("div", { onClick: (a) => Qi(a, e, r) }, o(f, Object.assign(Object.assign({}, t), { colType: t.providers.colType, name: s, expanded: n, depth: l }))) : i && [f("button", { class: { [Sa]: !0 }, onClick: (a) => Qi(a, e, r) }, Ma(n)), s]);
}, Ma = (t = !1) => f("svg", { "aria-hidden": "true", style: { transform: `rotate(${t ? 0 : -90}deg)` }, focusable: "false", viewBox: "0 0 448 512" }, f("path", { fill: "currentColor", d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }));
function Na(t) {
  var e;
  const r = [], i = (e = t.schemaModel.column) === null || e === void 0 ? void 0 : e.cellTemplate;
  if (i) r.push(i(f, t.schemaModel, t.additionalData));
  else {
    if (!t.schemaModel.column) return "";
    t.schemaModel.column.rowDrag && Oa(t.schemaModel.column.rowDrag, t.schemaModel) && r.push(f("span", { class: ca, onMouseDown: (o) => {
      var s;
      return (s = t.dragStartCell) === null || s === void 0 ? void 0 : s.emit({ originalEvent: o, model: t.schemaModel });
    } }, f("span", { class: aa }))), r.push(`${rs(t.schemaModel.model, t.schemaModel.column)}`);
  }
  return r;
}
const Ba = ({ renderProps: t, cellProps: e }) => {
  const r = Na.bind(null, t);
  return f("div", Object.assign({}, e, { redraw: r }), r());
};
let Wa = class {
  constructor() {
    this.currentRange = null;
  }
  selectionChange(e, r) {
    if (this.currentRange && r.forEach(((i, o) => {
      var s;
      e && o >= e.y && o <= e.y1 || i && i.t instanceof HTMLElement && i.t.classList.contains(se) && (i.t.classList.remove(se), !((s = i.o) === null || s === void 0) && s.class.includes(se) && (i.o.class = i.o.class.replace(se, "")));
    })), e) for (let i = e.y; i <= e.y1; i++) {
      const o = r.get(i);
      if (o && o.t instanceof HTMLElement && !o.t.classList.contains(se)) {
        const s = o.o = o.o || {};
        s.class = (s.class || "") + " " + se, o.t.classList.add(se);
      }
    }
    this.currentRange = e;
  }
  isRowFocused(e) {
    return this.currentRange && e >= this.currentRange.y && e <= this.currentRange.y1;
  }
};
const Ua = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.beforerowrender = m(this, "beforerowrender", 7), this.afterrender = m(this, "afterrender", 7), this.beforeCellRender = m(this, "beforecellrender", 7), this.beforeDataRender = m(this, "beforedatarender", 7), this.dragStartCell = m(this, "dragstartcell", 7), this.jobsBeforeRender = [], this.renderedRows = /* @__PURE__ */ new Map();
  }
  async updateCell(t) {
    var e, r, i;
    const o = (r = (e = this.renderedRows.get(t.row)) === null || e === void 0 ? void 0 : e.i) === null || r === void 0 ? void 0 : r[t.col];
    if (!((i = o?.o) === null || i === void 0) && i.redraw) {
      const l = await (s = this.element, n = o.o.redraw, new Promise(((a) => {
        const c = document.createElement("vnode-html");
        s.appendChild(c), c.redraw = n, c.addEventListener("html", ((d) => {
          c.remove(), a(d.detail);
        }));
      })));
      o.t.innerHTML = l.html, o.l = Math.random();
    }
    var s, n;
  }
  onDataStoreChange() {
    this.onStoreChange();
  }
  onColDataChange() {
    this.onStoreChange();
  }
  onStoreChange() {
    var t, e;
    (t = this.columnService) === null || t === void 0 || t.destroy(), this.columnService = new us(this.dataStore, this.colData), this.providers = { type: this.type, colType: this.colType, readonly: this.readonly, data: this.dataStore, columns: this.colData, viewport: this.viewportCol, dimension: this.dimensionRow, selection: this.rowSelectionStore }, (e = this.rangeUnsubscribe) === null || e === void 0 || e.call(this), this.rangeUnsubscribe = this.rowSelectionStore.onChange("range", ((r) => this.rowHighlightPlugin.selectionChange(r, this.renderedRows)));
  }
  connectedCallback() {
    this.rowHighlightPlugin = new Wa(), this.onStoreChange();
  }
  disconnectedCallback() {
    var t, e;
    (t = this.columnService) === null || t === void 0 || t.destroy(), (e = this.rangeUnsubscribe) === null || e === void 0 || e.call(this);
  }
  async componentWillRender() {
    return this.beforeDataRender.emit({ rowType: this.type, colType: this.colType }), Promise.all(this.jobsBeforeRender.map(((t) => typeof t == "function" ? t() : t)));
  }
  componentDidRender() {
    this.afterrender.emit({ type: this.type });
  }
  render() {
    if (this.renderedRows = /* @__PURE__ */ new Map(), !this.columnService.columns.length) return;
    const t = this.viewportRow.get("items");
    if (!t.length) return;
    const e = this.viewportCol.get("items");
    if (!e.length) return;
    const r = [], i = this.dataStore.get("groupingDepth"), o = this.dataStore.get("groupingCustomRenderer"), s = this.columnService.hasGrouping ? i : 0, n = this.viewportRow.get("renderOffset") || 0, l = this.viewportCol.get("renderOffset") || 0;
    for (let a of t) {
      const c = _(this.dataStore, a.itemIndex);
      if (F(c)) {
        const g = Object.assign(Object.assign({}, a), { start: a.start - n, index: a.itemIndex, model: c, groupingCustomRenderer: o, hasExpand: this.columnService.hasGrouping && this.colType !== "rowHeaders", columnItems: e, providers: this.providers });
        r.push(f(Ha, Object.assign({}, g)));
        continue;
      }
      const d = [];
      for (let g of e) {
        const p = Object.assign(Object.assign({}, this.columnService.rowDataModel(a.itemIndex, g.itemIndex)), { providers: this.providers }), v = this.triggerBeforeCellRender(p, a, g);
        if (v.defaultPrevented) continue;
        const { detail: { column: y, row: w, model: x } } = v, S = { [qo]: y.itemIndex, [Jo]: w.itemIndex, style: { width: `${y.size}px`, transform: `translateX(${y.start - l}px)`, height: w.size ? `${w.size}px` : void 0 } };
        s && !y.itemIndex && S.style && (S.style.paddingLeft = 10 * s + "px");
        const b = this.columnService.mergeProperties(w.itemIndex, y.itemIndex, S, x), $ = f(Ba, { renderProps: { schemaModel: x, additionalData: this.additionalData, dragStartCell: this.dragStartCell }, cellProps: b });
        d.push($);
      }
      let h = this.rowClass ? this.columnService.getRowClass(a.itemIndex, this.rowClass) : "";
      this.rowHighlightPlugin.isRowFocused(a.itemIndex) && (h += ` ${se}`);
      const u = f(ws, { index: a.itemIndex, rowClass: h, size: a.size, start: a.start - n, groupingLevel: s || void 0 }, d);
      this.beforerowrender.emit({ node: u, item: a, model: c, colType: this.columnService.type, rowType: this.type }), r.push(u), this.renderedRows.set(a.itemIndex, u);
    }
    return f(M, null, f("slot", null), r);
  }
  triggerBeforeCellRender(t, e, r) {
    return this.beforeCellRender.emit({ column: r, row: e, model: t, rowType: t.type, colType: t.colType });
  }
  get element() {
    return this;
  }
  static get watchers() {
    return { dataStore: [{ onDataStoreChange: 0 }], colData: [{ onColDataChange: 0 }] };
  }
  static get style() {
    return `.revo-drag-icon{width:11px;opacity:0.8}.revo-drag-icon::before{content:"::";display:inline-block}.revo-alt-icon{-webkit-mask-image:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 384 383' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath d='M192.4375,383 C197.424479,383 201.663411,381.254557 205.154297,377.763672 L205.154297,377.763672 L264.25,318.667969 C270.234375,312.683594 271.605794,306.075846 268.364258,298.844727 C265.122721,291.613607 259.51237,287.998047 251.533203,287.998047 L251.533203,287.998047 L213.382812,287.998047 L213.382812,212.445312 L288.935547,212.445312 L288.935547,250.595703 C288.935547,258.57487 292.551107,264.185221 299.782227,267.426758 C307.013346,270.668294 313.621094,269.296875 319.605469,263.3125 L319.605469,263.3125 L378.701172,204.216797 C382.192057,200.725911 383.9375,196.486979 383.9375,191.5 C383.9375,186.513021 382.192057,182.274089 378.701172,178.783203 L378.701172,178.783203 L319.605469,119.6875 C313.621094,114.201823 307.013346,112.955078 299.782227,115.947266 C292.551107,118.939453 288.935547,124.42513 288.935547,132.404297 L288.935547,132.404297 L288.935547,170.554688 L213.382812,170.554688 L213.382812,95.0019531 L251.533203,95.0019531 C259.51237,95.0019531 264.998047,91.3863932 267.990234,84.1552734 C270.982422,76.9241536 269.735677,70.3164062 264.25,64.3320312 L264.25,64.3320312 L205.154297,5.23632812 C201.663411,1.74544271 197.424479,0 192.4375,0 C187.450521,0 183.211589,1.74544271 179.720703,5.23632812 L179.720703,5.23632812 L120.625,64.3320312 C114.640625,70.3164062 113.269206,76.9241536 116.510742,84.1552734 C119.752279,91.3863932 125.36263,95.0019531 133.341797,95.0019531 L133.341797,95.0019531 L171.492188,95.0019531 L171.492188,170.554688 L95.9394531,170.554688 L95.9394531,132.404297 C95.9394531,124.42513 92.3238932,118.814779 85.0927734,115.573242 C77.8616536,112.331706 71.2539062,113.703125 65.2695312,119.6875 L65.2695312,119.6875 L6.17382812,178.783203 C2.68294271,182.274089 0.9375,186.513021 0.9375,191.5 C0.9375,196.486979 2.68294271,200.725911 6.17382812,204.216797 L6.17382812,204.216797 L65.2695312,263.3125 C71.2539062,268.798177 77.8616536,270.044922 85.0927734,267.052734 C92.3238932,264.060547 95.9394531,258.57487 95.9394531,250.595703 L95.9394531,250.595703 L95.9394531,212.445312 L171.492188,212.445312 L171.492188,287.998047 L133.341797,287.998047 C125.36263,287.998047 119.876953,291.613607 116.884766,298.844727 C113.892578,306.075846 115.139323,312.683594 120.625,318.667969 L120.625,318.667969 L179.720703,377.763672 C183.211589,381.254557 187.450521,383 192.4375,383 Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 384 383' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath d='M192.4375,383 C197.424479,383 201.663411,381.254557 205.154297,377.763672 L205.154297,377.763672 L264.25,318.667969 C270.234375,312.683594 271.605794,306.075846 268.364258,298.844727 C265.122721,291.613607 259.51237,287.998047 251.533203,287.998047 L251.533203,287.998047 L213.382812,287.998047 L213.382812,212.445312 L288.935547,212.445312 L288.935547,250.595703 C288.935547,258.57487 292.551107,264.185221 299.782227,267.426758 C307.013346,270.668294 313.621094,269.296875 319.605469,263.3125 L319.605469,263.3125 L378.701172,204.216797 C382.192057,200.725911 383.9375,196.486979 383.9375,191.5 C383.9375,186.513021 382.192057,182.274089 378.701172,178.783203 L378.701172,178.783203 L319.605469,119.6875 C313.621094,114.201823 307.013346,112.955078 299.782227,115.947266 C292.551107,118.939453 288.935547,124.42513 288.935547,132.404297 L288.935547,132.404297 L288.935547,170.554688 L213.382812,170.554688 L213.382812,95.0019531 L251.533203,95.0019531 C259.51237,95.0019531 264.998047,91.3863932 267.990234,84.1552734 C270.982422,76.9241536 269.735677,70.3164062 264.25,64.3320312 L264.25,64.3320312 L205.154297,5.23632812 C201.663411,1.74544271 197.424479,0 192.4375,0 C187.450521,0 183.211589,1.74544271 179.720703,5.23632812 L179.720703,5.23632812 L120.625,64.3320312 C114.640625,70.3164062 113.269206,76.9241536 116.510742,84.1552734 C119.752279,91.3863932 125.36263,95.0019531 133.341797,95.0019531 L133.341797,95.0019531 L171.492188,95.0019531 L171.492188,170.554688 L95.9394531,170.554688 L95.9394531,132.404297 C95.9394531,124.42513 92.3238932,118.814779 85.0927734,115.573242 C77.8616536,112.331706 71.2539062,113.703125 65.2695312,119.6875 L65.2695312,119.6875 L6.17382812,178.783203 C2.68294271,182.274089 0.9375,186.513021 0.9375,191.5 C0.9375,196.486979 2.68294271,200.725911 6.17382812,204.216797 L6.17382812,204.216797 L65.2695312,263.3125 C71.2539062,268.798177 77.8616536,270.044922 85.0927734,267.052734 C92.3238932,264.060547 95.9394531,258.57487 95.9394531,250.595703 L95.9394531,250.595703 L95.9394531,212.445312 L171.492188,212.445312 L171.492188,287.998047 L133.341797,287.998047 C125.36263,287.998047 119.876953,291.613607 116.884766,298.844727 C113.892578,306.075846 115.139323,312.683594 120.625,318.667969 L120.625,318.667969 L179.720703,377.763672 C183.211589,381.254557 187.450521,383 192.4375,383 Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");width:11px;height:11px;background-size:cover;background-repeat:no-repeat}.arrow-down{position:absolute;right:5px;top:0}.arrow-down svg{width:8px;margin-top:5px;margin-left:5px;opacity:0.4}.cell-value-wrapper{margin-right:10px;overflow:hidden;text-overflow:ellipsis}revogr-data{display:block;width:100%;position:relative}revogr-data .rgRow{position:absolute;width:100%;left:0}revogr-data .rgRow.groupingRow{font-weight:600;text-align:left}revogr-data .rgRow.groupingRow .group-expand{width:25px;height:100%;max-height:25px;margin-right:2px;background-color:transparent;border-color:transparent;vertical-align:middle;padding-left:5px;display:inline-flex}revogr-data .rgRow.groupingRow .group-expand svg{width:7px}revogr-data .revo-draggable{border:none;height:32px;display:inline-flex;outline:0;padding:0;font-size:0.8125rem;box-sizing:border-box;align-items:center;white-space:nowrap;vertical-align:middle;justify-content:center;text-decoration:none;width:24px;height:100%;cursor:pointer;display:inline-flex}revogr-data .revo-draggable:hover>.revo-drag-icon{opacity:1;zoom:1.2;font-weight:600}revogr-data .revo-draggable>.revo-drag-icon{pointer-events:none;transition:opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, zoom 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}revogr-data .rgCell{top:0;left:0;position:absolute;box-sizing:border-box;height:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;outline:none}revogr-data .rgCell.align-center{text-align:center}revogr-data .rgCell.align-left{text-align:left}revogr-data .rgCell.align-right{text-align:right}`;
  }
}, [260, "revogr-data", { readonly: [4], range: [4], rowClass: [1, "row-class"], additionalData: [8, "additional-data"], rowSelectionStore: [16], viewportRow: [16], viewportCol: [16], dimensionRow: [16], colData: [16], dataStore: [16], type: [513], colType: [513, "col-type"], jobsBeforeRender: [16], providers: [32], updateCell: [64] }, void 0, { dataStore: [{ onDataStoreChange: 0 }], colData: [{ onColDataChange: 0 }] }]);
function xs() {
  typeof customElements < "u" && ["revogr-data", "vnode-html"].forEach(((t) => {
    switch (t) {
      case "revogr-data":
        customElements.get(t) || customElements.define(t, Ua);
        break;
      case "vnode-html":
        customElements.get(t) || Ur();
    }
  }));
}
const Sr = "rv-filter", Ga = "active", Cs = "hasFilter", Xa = "and-or-button", Va = "trash-button", Ka = "reorder-button", Ya = ({ column: t }) => f("span", null, f("button", { class: { [Sr]: !0, [Ga]: t && !!t[Cs] } }, f("svg", { class: "filter-img", viewBox: "0 0 64 64" }, f("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, f("path", { d: "M43,48 L43,56 L21,56 L21,48 L43,48 Z M53,28 L53,36 L12,36 L12,28 L53,28 Z M64,8 L64,16 L0,16 L0,8 L64,8 Z", fill: "currentColor" }))))), qa = ({ ariaLabel: t, onClick: e }) => f("button", { type: "button", class: { [Va]: !0 }, "aria-label": t, onClick: e }, f("svg", { class: "trash-img", viewBox: "0 0 24 24" }, f("path", { fill: "currentColor", d: "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" }))), Ja = ({ text: t, onClick: e }) => f("button", { type: "button", class: { [Xa]: !0, "light revo-button": !0 }, onClick: e }, t), Za = ({ ariaLabel: t, dragging: e, dragOver: r, onDragStart: i, onDragEnd: o, onDragOver: s, onDragLeave: n, onDrop: l, onKeyDown: a }) => f("button", { type: "button", class: { [Ka]: !0, "filter-row-dragging": !!e, "filter-row-drag-over": !!r }, draggable: !0, title: t, "aria-label": t, onDragStart: i, onDragEnd: o, onDragOver: s, onDragLeave: n, onDrop: l, onKeyDown: a }, "::");
function $s(t) {
  return !!t.classList.contains(Sr) || t?.closest(`.${Sr}`);
}
function Ke(t, e, r) {
  const i = new CustomEvent(e, { detail: r, cancelable: !0, bubbles: !0 });
  return t?.dispatchEvent(i), i;
}
const Qa = ({ column: t }) => {
  var e;
  const r = { class: (e = t?.order) !== null && e !== void 0 ? e : "sort-off" };
  return f("span", Object.assign({}, { class: "sort-indicator" }), f("i", Object.assign({}, r)), t?.sortIndex ? f("sup", Object.assign({}, { class: "sort-order-index" }), t.sortIndex) : null);
};
var Fe;
(function(t) {
  t.start = "resize:start", t.move = "resize:move", t.end = "resize:end";
})(Fe || (Fe = {}));
const ve = { "resizable-r": { bit: 1, cursor: "ew-resize" }, "resizable-rb": { bit: 3, cursor: "se-resize" }, "resizable-b": { bit: 2, cursor: "s-resize" }, "resizable-lb": { bit: 6, cursor: "sw-resize" }, "resizable-l": { bit: 4, cursor: "w-resize" }, "resizable-lt": { bit: 12, cursor: "nw-resize" }, "resizable-t": { bit: 8, cursor: "n-resize" }, "resizable-rt": { bit: 9, cursor: "ne-resize" } };
let ec = class wr {
  constructor(e, r) {
    var i, o, s;
    this.initialProps = e, this.$event = r, this.mouseX = 0, this.mouseY = 0, this.width = 0, this.height = 0, this.changeX = 0, this.changeY = 0, this.disableCalcMap = 15, this.props = (s = e, Object.assign(Object.assign({}, s), { fitParent: s.fitParent || !1, active: s.active || [], disableAttributes: s.disableAttributes || [], minWidth: s.minWidth || 0, minHeight: s.minHeight || 0 })), this.mouseMoveFunc = this.handleMove.bind(this), this.mouseUpFunc = this.handleUp.bind(this), this.minW = this.props.minWidth, this.minH = this.props.minHeight, this.maxW = (i = this.props.maxWidth) !== null && i !== void 0 ? i : 0, this.maxH = (o = this.props.maxHeight) !== null && o !== void 0 ? o : 0, this.parent = { width: 0, height: 0 }, this.resizeState = 0;
  }
  set(e) {
    this.$el = e, this.props.disableAttributes.forEach(((r) => {
      switch (r) {
        case "l":
          this.disableCalcMap &= -2;
          break;
        case "t":
          this.disableCalcMap &= -3;
          break;
        case "w":
          this.disableCalcMap &= -5;
          break;
        case "h":
          this.disableCalcMap &= -9;
      }
    }));
  }
  emitEvent(e, r) {
    var i;
    if (!this.$event) return;
    const o = (i = this.activeResizer) === null || i === void 0 ? void 0 : i.classList.contains("resizable-l");
    this.$event(Object.assign({ eventName: e, width: this.width + this.changeX * (o ? -1 : 1), height: this.height + this.changeY, changedX: this.changeX, changedY: this.changeY }, r));
  }
  static isTouchEvent(e) {
    var r;
    return ((r = e.touches) === null || r === void 0 ? void 0 : r.length) >= 0;
  }
  handleMove(e) {
    var r;
    if (!this.resizeState) return;
    let i, o;
    wr.isTouchEvent(e) ? (i = e.touches[0].clientY, o = e.touches[0].clientX) : (i = e.clientY, o = e.clientX);
    let s = this.resizeState & ve["resizable-r"].bit || this.resizeState & ve["resizable-l"].bit;
    if ((this.resizeState & ve["resizable-t"].bit || this.resizeState & ve["resizable-b"].bit) && 8 & this.disableCalcMap) {
      let n = this.changeY + (i - this.mouseY);
      const l = this.height + n;
      l < this.minH && (n = -(this.height - this.minH)), this.maxH && l > this.maxH && (n = this.maxH - this.height), this.changeY = n, this.mouseY = i, this.activeResizer && (this.activeResizer.style.bottom = -this.changeY + "px");
    }
    if (s && 4 & this.disableCalcMap) {
      const n = (r = this.activeResizer) === null || r === void 0 ? void 0 : r.classList.contains("resizable-l");
      let l = this.changeX + (o - this.mouseX);
      const a = this.width + l * (n ? -1 : 1);
      a < this.minW && (l = -(this.width - this.minW)), this.maxW && a > this.maxW && (l = this.maxW - this.width), this.changeX = l, this.mouseX = o, this.activeResizer && (n ? this.activeResizer.style.left = `${this.changeX}px` : this.activeResizer.style.right = -this.changeX + "px");
    }
    this.emitEvent(Fe.move);
  }
  handleDown(e) {
    if (!e.defaultPrevented) {
      e.preventDefault(), this.dropInitial();
      for (let r in ve) {
        const i = e.target;
        if (this.$el.contains(i) && i?.classList.contains(r)) {
          document.body.style.cursor = ve[r].cursor, wr.isTouchEvent(e) ? this.setInitials(e.touches[0], i) : (e.preventDefault && e.preventDefault(), this.setInitials(e, i)), this.resizeState = ve[r].bit, this.emitEvent(Fe.start);
          break;
        }
      }
      this.bindMove();
    }
  }
  handleUp(e) {
    e.preventDefault(), this.resizeState !== 0 && (this.resizeState = 0, document.body.style.cursor = "", this.emitEvent(Fe.end)), this.dropInitial(), this.unbindMove();
  }
  setInitials({ clientX: e, clientY: r }, i) {
    var o, s, n, l;
    const a = getComputedStyle(this.$el);
    if (this.$el.classList.add("active"), this.activeResizer = i, 4 & this.disableCalcMap) {
      this.mouseX = e, this.width = this.$el.clientWidth, this.parent.width = (s = (o = this.$el.parentElement) === null || o === void 0 ? void 0 : o.clientWidth) !== null && s !== void 0 ? s : 0;
      const c = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight);
      this.minW = Math.max(c, this.initialProps.minWidth || 0), this.initialProps.maxWidth && (this.maxW = Math.max(this.width, this.initialProps.maxWidth));
    }
    if (8 & this.disableCalcMap) {
      this.mouseY = r, this.height = this.$el.clientHeight, this.parent.height = (l = (n = this.$el.parentElement) === null || n === void 0 ? void 0 : n.clientHeight) !== null && l !== void 0 ? l : 0;
      const c = parseFloat(a.paddingTop) + parseFloat(a.paddingBottom);
      this.minH = Math.max(c, this.initialProps.minHeight || 0), this.initialProps.maxHeight && (this.maxH = Math.max(this.height, this.initialProps.maxHeight));
    }
  }
  dropInitial() {
    this.changeX = this.changeY = this.minW = this.minH, this.width = this.height = 0, this.activeResizer && this.activeResizer.removeAttribute("style"), this.$el.classList.remove("active"), this.activeResizer = void 0;
  }
  bindMove() {
    document.documentElement.addEventListener("mouseup", this.mouseUpFunc, !0), document.documentElement.addEventListener("touchend", this.mouseUpFunc, !0), document.documentElement.addEventListener("mousemove", this.mouseMoveFunc, !0), document.documentElement.addEventListener("touchmove", this.mouseMoveFunc, !0), document.documentElement.addEventListener("mouseleave", this.mouseUpFunc);
  }
  unbindMove() {
    document.documentElement.removeEventListener("mouseup", this.mouseUpFunc, !0), document.documentElement.removeEventListener("touchend", this.mouseUpFunc, !0), document.documentElement.removeEventListener("mousemove", this.mouseMoveFunc, !0), document.documentElement.removeEventListener("touchmove", this.mouseMoveFunc, !0), document.documentElement.removeEventListener("mouseleave", this.mouseUpFunc);
  }
};
const tc = (t, e) => {
  const r = [], i = t.canResize && new ec(t, ((o) => {
    var s;
    o.eventName === Fe.end && ((s = t.onResize) === null || s === void 0 || s.call(t, o));
  })) || null;
  if (t.active && t.canResize) for (let o in t.active) r.push(f("div", { onClick: (s) => s.preventDefault(), onDblClick: (s) => {
    var n;
    s.preventDefault(), (n = t.onDblClick) === null || n === void 0 || n.call(t, s);
  }, onMouseDown: (s) => i?.handleDown(s), onTouchStart: (s) => i?.handleDown(s), class: `resizable resizable-${t.active[o]}` }));
  return f("div", Object.assign({}, t, { ref: (o) => o && i?.set(o) }), e, r);
}, Rs = "columnclick", Os = ({ data: t, props: e, additionalData: r }, i) => {
  let o = t?.name || "", s = e;
  if (t?.columnTemplate && (o = t.columnTemplate(f, t, r)), t?.columnProperties) {
    const l = t.columnProperties(t);
    l && (s = gs(e, l));
  }
  const n = Object.assign(Object.assign({}, s), { onMouseDown(l) {
    Ke(l.currentTarget, Rs, { data: t, event: l });
  } });
  return f(tc, Object.assign({}, n), f("div", { class: "header-content" }, o), i);
}, rc = (t) => {
  var e, r, i, o, s, n, l, a, c, d;
  const h = !!(!((e = t.data) === null || e === void 0) && e.sortable || !((r = t.data) === null || r === void 0) && r.order || !((i = t.data) === null || i === void 0) && i.sortIndex), u = { [Zo]: !0, [na]: !!(!((o = t.data) === null || o === void 0) && o.sortable) };
  !((s = t.data) === null || s === void 0) && s.order && (u[t.data.order] = !0);
  const g = { key: String((l = (n = t.data) === null || n === void 0 ? void 0 : n.prop) !== null && l !== void 0 ? l : t.column.itemIndex), [qo]: t.column.itemIndex, canResize: t.canResize, minWidth: ((a = t.data) === null || a === void 0 ? void 0 : a.minSize) || Ko, maxWidth: (c = t.data) === null || c === void 0 ? void 0 : c.maxSize, active: t.active || ["r"], class: u, style: { width: `${t.column.size}px`, transform: `translateX(${t.column.start - (t.renderOffset || 0)}px)` }, onResize: t.onResize, onDblClick(p) {
    var v;
    (v = t.onDblClick) === null || v === void 0 || v.call(t, { column: t.data, index: t.column.itemIndex, originalEvent: p, providers: t.data.providers });
  }, onClick(p) {
    !p.defaultPrevented && t.onClick && t.onClick({ column: t.data, index: t.column.itemIndex, originalEvent: p, providers: t.data.providers });
  } };
  return t.range && t.column.itemIndex >= t.range.x && t.column.itemIndex <= t.range.x1 && typeof g.class == "object" && (g.class[Qo] = !0), f(Os, { data: t.data, props: g, additionalData: t.additionalData }, h ? f(Qa, { column: t.data }) : null, t.canFilter && ((d = t.data) === null || d === void 0 ? void 0 : d.filter) !== !1 ? f(Ya, { column: t.data }) : "");
}, ic = (t) => {
  const e = { key: `${t.group.name}-${t.group.indexes.join("-")}`, canResize: t.canResize, minWidth: t.group.indexes.length * Ko, maxWidth: 0, active: t.active || ["r"], class: { [Zo]: !0 }, style: { transform: `translateX(${t.start - (t.renderOffset || 0)}px)`, width: t.end - t.start + "px" }, onResize: t.onResize };
  return f(Os, { data: Object.assign(Object.assign({}, t.group), { prop: "", providers: t.providers, index: t.start }), props: e, additionalData: t.additionalData });
}, oc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.initialHeaderClick = m(this, "beforeheaderclick", 7), this.headerresize = m(this, "headerresize", 7), this.beforeResize = m(this, "beforeheaderresize", 7), this.headerdblClick = m(this, "headerdblclick", 7), this.beforeHeaderRender = m(this, "beforeheaderrender", 7), this.beforeGroupHeaderRender = m(this, "beforegroupheaderrender", 7), this.afterHeaderRender = m(this, "afterheaderrender", 7), this.groupingDepth = 0, this.additionalData = {};
  }
  onResize({ width: t }, e) {
    this.beforeResize.emit([Object.assign(Object.assign({}, this.colData[e]), { size: t || void 0 })]).defaultPrevented || this.headerresize.emit({ [e]: t || 0 });
  }
  onResizeGroup(t, e, r) {
    const i = {}, o = t / (r - e + 1);
    for (let s = e; s <= r; s++) {
      const n = ae(this.dimensionCol.state, s);
      i[s] = n.end - n.start + o;
    }
    this.headerresize.emit(i);
  }
  componentDidRender() {
    this.afterHeaderRender.emit(this.providers);
  }
  render() {
    var t;
    const e = this.viewportCol.get("items"), r = (t = this.selectionStore) === null || t === void 0 ? void 0 : t.get("range"), { cells: i } = this.renderHeaderColumns(e, r), o = this.renderGroupingColumns();
    return [f("div", { key: "3cc466db6bc4df0cd61c47a22c3a0473318e5dd8", class: "group-rgRow" }, o), f("div", { key: "9742a3fa4d4b75073aef5544806f42386ebffdea", class: `${Gi} ${la}` }, i)];
  }
  renderHeaderColumns(t, e) {
    const r = [], i = this.viewportCol.get("renderOffset") || 0;
    for (let s of t) {
      const n = { range: e, column: s, data: Object.assign(Object.assign({}, this.colData[s.itemIndex]), { index: s.itemIndex, providers: this.providers }), canFilter: !!this.columnFilter, canResize: this.canResize, renderOffset: i, active: this.resizeHandler, additionalData: this.additionalData, onResize: (a) => this.onResize(a, s.itemIndex), onDblClick: (a) => this.headerdblClick.emit(a), onClick: (a) => this.initialHeaderClick.emit(a) }, l = this.beforeHeaderRender.emit(n);
      l.defaultPrevented || r.push(l.detail);
    }
    const o = this.getDuplicateHeaderProps(r);
    return { cells: r.map(((s) => f(rc, Object.assign({ key: this.getHeaderCellKey(s.data, this.type, o) }, s)))) };
  }
  renderGroupingColumns() {
    const t = this.getVisibleGroupRange();
    return Array.from({ length: this.groupingDepth }, ((e, r) => this.renderGroupRow(r, t))).flat();
  }
  renderGroupRow(t, e) {
    return [...(this.groups[t] || []).map(((r) => this.renderGroupColumn(r, t, e))).filter(((r) => !!r)), f("div", { key: `group-row-${t}`, class: { [Gi]: !0, group: !0 } })];
  }
  renderGroupColumn(t, e, r) {
    const i = this.getGroupIndexRange(t), o = this.getGroupBounds(i), s = { level: e, providers: this.providers, start: o.start, end: o.end, group: t, renderOffset: this.viewportCol.get("renderOffset") || 0, active: this.resizeHandler, canResize: this.canResize, additionalData: this.additionalData, onResize: (u) => {
      var g;
      return i ? this.onResizeGroup((g = u.changedX) !== null && g !== void 0 ? g : 0, i.startIndex, i.endIndex) : void 0;
    } }, n = this.beforeGroupHeaderRender.emit(s);
    if (n.defaultPrevented) return;
    const l = this.getGroupIndexRange(n.detail.group);
    if (!(l && r && (a = l.startIndex, c = l.endIndex, d = r, a <= d.end && c >= d.start))) return;
    var a, c, d;
    n.detail.onResize === s.onResize && (n.detail.onResize = (u) => {
      var g;
      return this.onResizeGroup((g = u.changedX) !== null && g !== void 0 ? g : 0, l.startIndex, l.endIndex);
    });
    const h = this.getGroupBounds(l);
    return n.detail.start === s.start && (n.detail.start = h.start), n.detail.end === s.end && (n.detail.end = h.end), f(ic, Object.assign({ key: this.getGroupHeaderCellKey(n.detail.group, e) }, n.detail));
  }
  getGroupIndexRange(t) {
    var e;
    const r = (e = t.indexes[0]) !== null && e !== void 0 ? e : -1;
    if (!(r < 0)) return { startIndex: r, endIndex: t.indexes[t.indexes.length - 1] };
  }
  getGroupBounds(t) {
    return t ? { start: ae(this.dimensionCol.state, t.startIndex).start, end: ae(this.dimensionCol.state, t.endIndex).end } : { start: 0, end: 0 };
  }
  getVisibleGroupRange() {
    const t = this.viewportCol.get("items");
    if (t.length) return t.reduce(((e, r) => ({ start: Math.min(e.start, r.itemIndex), end: Math.max(e.end, r.itemIndex) })), { start: t[0].itemIndex, end: t[0].itemIndex });
  }
  getHeaderCellKey(t, e, r) {
    if (t?.prop === void 0) return `${e}-${String(t?.index)}`;
    const i = String(t.prop);
    return r.has(i) ? `${e}-${i}-${String(t.index)}` : `${e}-${i}`;
  }
  getDuplicateHeaderProps(t) {
    const e = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
    return t.forEach((({ data: i }) => {
      if (i?.prop !== void 0) {
        const o = String(i.prop);
        e.has(o) ? r.add(o) : e.add(o);
      }
    })), r;
  }
  getGroupHeaderCellKey(t, e) {
    return `group-${e}-${t.name}-${t.indexes.join("-")}`;
  }
  get providers() {
    return { type: this.type, readonly: this.readonly, data: this.colData, viewport: this.viewportCol, dimension: this.dimensionCol, selection: this.selectionStore };
  }
  get element() {
    return this;
  }
  static get style() {
    return '@charset "UTF-8";revogr-header{position:relative;z-index:5;display:block}revogr-header .header-rgRow{display:block;position:relative}revogr-header .header-rgRow.group{z-index:0}revogr-header .group-rgRow{position:relative;overflow:hidden}revogr-header .rgHeaderCell{position:absolute;box-sizing:border-box;height:100%;z-index:1;display:flex}revogr-header .rgHeaderCell.align-center{text-align:center}revogr-header .rgHeaderCell.align-left{text-align:left}revogr-header .rgHeaderCell.align-right{text-align:right}revogr-header .rgHeaderCell.sortable{cursor:pointer}revogr-header .rgHeaderCell .sort-indicator{display:inline-flex;align-items:flex-start;gap:1px}revogr-header .rgHeaderCell .sort-indicator i.asc:after,revogr-header .rgHeaderCell .sort-indicator i.desc:after{font-size:13px}revogr-header .rgHeaderCell .sort-indicator i.asc:after{content:"↑"}revogr-header .rgHeaderCell .sort-indicator i.desc:after{content:"↓"}revogr-header .rgHeaderCell .sort-indicator .sort-order-index{font-size:10px;line-height:1;top:0}revogr-header .rgHeaderCell.active{z-index:10}revogr-header .rgHeaderCell.active .resizable{background-color:deepskyblue}revogr-header .rgHeaderCell .header-content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-grow:1}revogr-header .rgHeaderCell .resizable{display:block;position:absolute;z-index:90;touch-action:none;user-select:none}revogr-header .rgHeaderCell .resizable:hover{background-color:deepskyblue}revogr-header .rgHeaderCell>.resizable-r{cursor:ew-resize;width:6px;right:0;top:0;height:100%}revogr-header .rgHeaderCell>.resizable-rb{cursor:se-resize;width:6px;height:6px;right:0;bottom:0}revogr-header .rgHeaderCell>.resizable-b{cursor:s-resize;height:6px;bottom:0;width:100%;left:0}revogr-header .rgHeaderCell>.resizable-lb{cursor:sw-resize;width:6px;height:6px;left:0;bottom:0}revogr-header .rgHeaderCell>.resizable-l{cursor:w-resize;width:6px;left:0;height:100%;top:0}revogr-header .rgHeaderCell>.resizable-lt{cursor:nw-resize;width:6px;height:6px;left:0;top:0}revogr-header .rgHeaderCell>.resizable-t{cursor:n-resize;height:6px;top:0;width:100%;left:0}revogr-header .rgHeaderCell>.resizable-rt{cursor:ne-resize;width:6px;height:6px;right:0;top:0}revogr-header .rv-filter{visibility:hidden}';
  }
}, [0, "revogr-header", { viewportCol: [16], dimensionCol: [16], selectionStore: [16], groups: [16], groupingDepth: [2, "grouping-depth"], readonly: [4], canResize: [4, "can-resize"], resizeHandler: [16], colData: [16], columnFilter: [4, "column-filter"], type: [1], additionalData: [8, "additional-data"] }]);
function zs() {
  typeof customElements < "u" && ["revogr-header"].forEach(((t) => {
    t === "revogr-header" && (customElements.get(t) || customElements.define(t, oc));
  }));
}
const Es = (t, e, r = 50) => e?.size || Math.max(10 * (t.toString().length + 1), r);
function Ds(t, e, r = 1) {
  return !e || t.realSize <= e ? 0 : Math.max(0, t.realSize - e - t.originItemSize * r);
}
function sc(t, e, r, i = 1) {
  return Math.min(Math.max(0, t), Ds(e, r, i));
}
function nc(t, e, r, i, o) {
  const s = ee(o, t), n = Gr(e);
  let l;
  if (n) {
    let c = s.itemIndex - (n.itemIndex || 0);
    c && (l = lc(Math.abs(c), Object.assign(Object.assign({ positiveDirection: c > -1 }, o), e)));
  }
  const a = (function(c, d, h) {
    return Math.min(c + (h.end - h.start), d);
  })(i, o.realSize, s);
  if (l) {
    const c = ks(s, r, a, l, o);
    c.length && Ts(l.items, c, l);
  }
  if (!l) {
    const c = Ps({ firstItemStart: s.start, firstItemIndex: s.itemIndex, origSize: o.originItemSize, maxSize: a, maxCount: r, sizes: o.sizes });
    l = { items: c, start: 0, end: c.length - 1 };
  }
  return l;
}
function Ts(t, e, r) {
  t.splice(r.end + 1, 0, ...e), r.start >= r.end && (r.start !== r.end || r.start !== 0) && (r.start += e.length), r.end += e.length;
}
function ks(t, e, r, i, o) {
  const s = Xr(i);
  return Ps({ sizes: o.sizes, firstItemStart: s.end, firstItemIndex: s.itemIndex + 1, origSize: o.originItemSize, maxSize: r - (s.end - t.start), maxCount: e });
}
function Ps(t, e = 0) {
  const r = [];
  let i = t.firstItemIndex, o = e;
  for (; o <= t.maxSize && i < t.maxCount; ) {
    const s = xr(i, t.sizes, t.origSize);
    r.push({ start: t.firstItemStart + o, end: t.firstItemStart + o + s, itemIndex: i, size: s }), o += s, i++;
  }
  return r;
}
function lc(t, e) {
  var r, i;
  const o = [...e.items], s = o.length;
  let n = { start: e.start, end: e.end };
  if (!(t > s)) {
    if (e.positiveDirection) {
      let l = Xr(e), a = n.start;
      const c = a + t;
      for (; a < c; a++) {
        const d = l.itemIndex + 1, h = xr(d, e.sizes, e.originItemSize);
        if (l.end + h > e.realSize) break;
        let u = a % s;
        if (!o[u]) throw new Error("incorrect index");
        o[u] = l = { start: l.end, end: l.end + h, itemIndex: d, size: h }, n.start++, n.end = u;
      }
    } else {
      let l = Gr(e);
      const a = n.end;
      for (let c = 0; c < t; c++) {
        const d = ((r = l?.itemIndex) !== null && r !== void 0 ? r : 0) - 1, h = xr(d, e.sizes, e.originItemSize);
        let u = a - c;
        if (u = (u < 0 ? s + u : u) % s, !o[u]) {
          console.error("incorrect index");
          break;
        }
        const g = (i = l?.start) !== null && i !== void 0 ? i : 0;
        o[u] = l = { start: g - h, end: g, itemIndex: d, size: h }, n.start = u, n.end--;
      }
    }
    return Object.assign({ items: o }, { start: (n.start < 0 ? s + n.start : n.start) % s, end: (n.end < 0 ? s + n.end : n.end) % s });
  }
}
function xr(t, e, r = 0) {
  return typeof e?.[t] == "number" ? e[t] : r;
}
function ac(t, e, r, i) {
  return !(!r || !i) && (t >= r.start && t <= r.end || t > r.end && i.end === e);
}
function cc(t, e, r, i) {
  var o;
  return !!r && e + t > ((o = i?.end) !== null && o !== void 0 ? o : 0);
}
function Gr(t) {
  return t.items[t.start];
}
function Xr(t) {
  return t.items[t.end];
}
function dc(t, e, r, i) {
  const o = [...t], s = o.length;
  let n = i, l = 0, a = e;
  if (!s) return [];
  for (; l < s; ) {
    const c = o[a];
    c.start = n, c.size = r, c.end = c.start + r, n = c.end, a++, l++, a === s && (a = 0);
  }
  return o;
}
class js {
  get lastCoordinate() {
    return this.lastKnownScroll;
  }
  set lastCoordinate(e) {
    this.lastKnownScroll = e;
  }
  constructor(e) {
    this.type = e, this.lastKnownScroll = 0, this.store = jt({ items: [], start: 0, end: 0, virtualSize: 0, realCount: 0, clientSize: 0, renderOffset: 0 });
  }
  setViewPortCoordinate(e, r, i = !1) {
    const o = this.store.get("virtualSize");
    if (!o) return;
    const s = 1 * r.originItemSize, n = o + 2 * s, l = Ds(r, o, 1);
    let a, c = sc(e, r, o, 1);
    this.lastCoordinate = c, c -= s, c = c < 0 ? 0 : c < l ? c : l, a = i ? { items: [], start: 0, end: 0 } : this.getItems();
    const d = Gr(a), h = Xr(a);
    let u = {};
    if (ac(c, r.realSize, d, h)) {
      if (cc(c, n, d, h)) {
        const g = [...a.items], p = ks(d, this.store.get("realCount"), n + c - d.start, a, { sizes: r.sizes, originItemSize: r.originItemSize });
        if (p.length) {
          const v = { start: this.store.get("start"), end: this.store.get("end") };
          Ts(g, p, v), u = Object.assign(Object.assign(Object.assign({}, u), { items: [...g] }), v), this.setViewport(Object.assign({}, u));
        }
      }
    } else u = Object.assign(Object.assign({}, u), nc(c, a, this.store.get("realCount"), n, r)), this.setViewport(Object.assign({}, u));
  }
  setOriginalSizes(e) {
    const r = this.store.get("items");
    r.length && P(this.store, { items: dc(r, this.store.get("start"), e, this.lastCoordinate) });
  }
  getItems() {
    return { items: this.store.get("items"), start: this.store.get("start"), end: this.store.get("end") };
  }
  setViewport(e) {
    typeof e.realCount != "number" && typeof e.virtualSize != "number" || (e = Object.assign(Object.assign({}, e), { items: e.items || [] })), P(this.store, e);
  }
}
const hc = (t) => (e, { rowIndex: r }) => t + r, uc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.scrollViewport = m(this, "scrollview", 3), this.elementToScroll = m(this, "ref", 3), this.jobsBeforeRender = [];
  }
  render() {
    const t = [], e = new js("colPinStart");
    let r = 1;
    for (let n of this.dataPorts) {
      const l = n.dataStore.get("items").length, a = new Rt(n.type, Object.assign({}, n.dataStore.state)), c = new Rt("colPinStart"), d = Object.assign({ cellTemplate: hc(r) }, this.rowHeaderColumn);
      c.updateData([d]), t.push(f("revogr-data", Object.assign({}, n, { colType: "rowHeaders", jobsBeforeRender: this.jobsBeforeRender, rowClass: this.rowClass, dataStore: a.store, colData: c.store, viewportCol: e.store, readonly: !0, range: !1 }))), r += l;
    }
    const i = Es(r, this.rowHeaderColumn);
    e.setViewport({ realCount: 1, virtualSize: 0, items: [{ size: i, start: 0, end: i, itemIndex: 0 }] });
    const o = { contentHeight: this.height, contentWidth: 0, style: { minWidth: `${i}px` }, colType: "rowHeaders", ref: (n) => this.elementToScroll.emit(n), onScrollviewport: (n) => this.scrollViewport.emit(n.detail) }, s = Object.assign(Object.assign({}, this.headerProp), { groups: [], colData: typeof this.rowHeaderColumn == "object" ? [this.rowHeaderColumn] : [], viewportCol: e.store, canResize: !1, type: Gt, slot: It });
    return f(M, { class: { [Gt]: !0 }, key: Gt }, f("revogr-viewport-scroll", Object.assign({ key: "c401e82e02e4bdb7afb25f2f49c6776f2e115c81" }, o, { "row-header": !0 }), f("revogr-header", Object.assign({ key: "3c73d27bd96e23a34fc0cf47eda4d2e65751df98" }, s)), t));
  }
}, [0, "revogr-row-headers", { height: [2], dataPorts: [16], headerProp: [16], rowClass: [1, "row-class"], resize: [4], rowHeaderColumn: [16], additionalData: [8, "additional-data"], jobsBeforeRender: [16] }]);
function gc() {
  typeof customElements < "u" && ["revogr-row-headers", "revogr-data", "revogr-header", "revogr-viewport-scroll", "vnode-html"].forEach(((t) => {
    switch (t) {
      case "revogr-row-headers":
        customElements.get(t) || customElements.define(t, uc);
        break;
      case "revogr-data":
        customElements.get(t) || xs();
        break;
      case "revogr-header":
        customElements.get(t) || zs();
        break;
      case "revogr-viewport-scroll":
        customElements.get(t) || Ss();
        break;
      case "vnode-html":
        customElements.get(t) || Ur();
    }
  }));
}
function Ls(t) {
  const e = t.createElement("div");
  e.style.overflow = "scroll", e.style.visibility = "hidden", e.style.position = "absolute", e.style.top = "-9999px", e.style.width = "50px", e.style.height = "50px", t.body.appendChild(e);
  const r = e.offsetWidth - e.clientWidth;
  return t.body.removeChild(e), r;
}
async function Ae(t = 0) {
  await new Promise(((e) => {
    setTimeout((() => e()), t);
  }));
}
function Fs(t, e) {
  return !(e && t && !(t.target instanceof Element && t.target.classList.contains(e)));
}
function ce(t, e, r) {
  if ((function(i) {
    return !!i.touches;
  })(t)) {
    if (t.touches.length > 0) {
      const i = t.touches[0];
      return Fs(i, r) ? i[e] || 0 : null;
    }
    return null;
  }
  return t[e] || 0;
}
function Is(t, e) {
  const r = {};
  for (let i in t) {
    const o = parseInt(i, 10);
    r[o] = _(e, o);
  }
  return r;
}
function eo(t, e) {
  if (t.defaultPrevented) return null;
  const r = ce(t, "clientX"), i = ce(t, "clientY");
  if (r === null || i === null) return null;
  const o = Cr({ x: r, y: i }, e);
  return Et(o, e.lastCell) ? null : o;
}
function Cr({ x: t, y: e }, { el: r, rows: i, cols: o }) {
  const { top: s, left: n, height: l, width: a } = r.getBoundingClientRect();
  let c = e - s, d = t - n;
  c >= l && (c = l - 1), d >= a && (d = a - 1);
  const h = ee(i, c + (i.renderOffset || 0)), u = ee(o, d + (o.renderOffset || 0));
  return u.itemIndex < 0 && (u.itemIndex = 0), h.itemIndex < 0 && (h.itemIndex = 0), { x: u.itemIndex, y: h.itemIndex };
}
function pc(t, e, r, i = !1) {
  const o = (s, n = 0) => {
    const l = { x: t.x, y: t.y }, a = i ? { x: t.x1, y: t.y1 } : l;
    return (a[s] > e[s] ? a : l)[s] += n, { start: l, end: a };
  };
  return r.x ? o("x", r.x) : r.y ? o("y", r.y) : null;
}
function Et({ x: t, y: e }, r) {
  return t >= r.x || e >= r.y;
}
function to({ x: t, y: e }) {
  return t < 0 || e < 0;
}
function Dt(t) {
  return { left: `${t.left}px`, top: `${t.top}px`, width: `${t.width}px`, height: `${t.height}px` };
}
function tt({ x: t, y: e, x1: r, y1: i }, o, s) {
  const n = o.renderOffset || 0, l = s.renderOffset || 0, a = ae(o, e).start - n, c = ae(s, t).start - l, d = ae(o, i).end - n, h = ae(s, r).end - l;
  return { left: c, right: h, top: a, bottom: d, width: h - c, height: d - a };
}
const fc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost();
  }
  render() {
    return f(M, { key: "3d66475a019010c24b6c610ccc047e01c35178f9" }, f("a", { key: "777afddffef0309a697b9c14ee73c0001ac22b71", href: "https://rv-grid.com/guide/attribution", target: "_blank", rel: "noopener noreferrer", title: "Made with ❤️ by Revolist OU Team", class: "value" }, "RevoGrid"));
  }
}, [0, "revogr-attribution"]);
function vc() {
  typeof customElements < "u" && ["revogr-attribution"].forEach(((t) => {
    t === "revogr-attribution" && (customElements.get(t) || customElements.define(t, fc));
  }));
}
const mc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.beforePaste = m(this, "beforepaste", 7), this.beforePasteApply = m(this, "beforepasteapply", 7), this.pasteRegion = m(this, "pasteregion", 7), this.afterPasteApply = m(this, "afterpasteapply", 7), this.beforeCut = m(this, "beforecut", 7), this.clearRegion = m(this, "clearregion", 7), this.beforeCopy = m(this, "beforecopy", 7), this.beforeCopyApply = m(this, "beforecopyapply", 7), this.copyRegion = m(this, "copyregion", 7);
  }
  onPaste(t) {
    if (this.readonly) return;
    const e = this.getData(t), r = (e?.types.indexOf("text/html") || -1) > -1, i = (r ? e?.getData("text/html") : e?.getData("text")) || "", o = e?.getData("text") || "", s = this.beforePaste.emit({ raw: i, dataText: o, isHTML: r, event: t });
    if (s.defaultPrevented) return;
    let n;
    n = s.detail.isHTML ? this.htmlParse(s.detail.raw) || this.textParse(o || "") : this.textParse(s.detail.raw);
    const l = this.beforePasteApply.emit({ raw: i, parsed: n, dataText: o, event: t });
    l.defaultPrevented || (this.pasteRegion.emit(l.detail.parsed), this.afterPasteApply.emit({ raw: i, parsed: n, dataText: o, event: t }).defaultPrevented || t.preventDefault());
  }
  copyStarted(t) {
    const e = this.beforeCopy.emit({ event: t });
    if (e.defaultPrevented) return;
    const r = this.getData(e.detail.event);
    t.preventDefault(), this.copyRegion.emit(r || void 0);
  }
  cutStarted(t) {
    const e = this.beforeCut.emit({ event: t });
    if (e.defaultPrevented) return;
    const r = this.getData(e.detail.event);
    this.copyStarted(t), this.readonly || (this.clearRegion.emit(r || void 0), t.preventDefault());
  }
  async doCopy(t, e) {
    if (this.beforeCopyApply.emit({ event: t, data: e }).defaultPrevented) return;
    const r = e ? this.parserCopy(e) : "";
    t.setData("text/plain", r);
  }
  parserCopy(t) {
    return t.map(((e) => e.join("	"))).join(`
`);
  }
  textParse(t) {
    const e = [], r = t.split(/\r\n|\n|\r/);
    for (let i in r) e.push(r[i].split("	"));
    return e;
  }
  htmlParse(t) {
    const e = [], r = document.createRange().createContextualFragment(t).querySelector("table");
    if (!r) return null;
    for (const i of Array.from(r.rows)) e.push(Array.from(i.cells).map(((o) => o.innerText)));
    return e;
  }
  getData(t) {
    return t.clipboardData || globalThis?.clipboardData;
  }
}, [0, "revogr-clipboard", { readonly: [4], doCopy: [64] }, [[4, "paste", "onPaste"], [4, "copy", "copyStarted"], [4, "cut", "cutStarted"]]]);
function _s() {
  typeof customElements < "u" && ["revogr-clipboard"].forEach(((t) => {
    t === "revogr-clipboard" && (customElements.get(t) || customElements.define(t, mc));
  }));
}
function yc(t) {
  return T.BACKSPACE === t || T.DELETE === t;
}
function As(t) {
  return T.TAB === t;
}
function Hs(t) {
  return cr.ENTER === t;
}
function bc(t) {
  return t.ctrlKey && t.code === "KeyX" || t.metaKey && t.code === "KeyX";
}
function Sc(t) {
  return t.ctrlKey && t.code === "KeyC" || t.metaKey && t.code === "KeyC";
}
function wc(t) {
  return t.ctrlKey && t.code === "KeyV" || t.metaKey && t.code === "KeyV";
}
function xc(t) {
  return t.ctrlKey && t.code === "KeyA" || t.metaKey && t.code === "KeyA";
}
function ro(t) {
  var e;
  return !(!((e = t.getModifierState) === null || e === void 0) && e.call(t, "AltGraph")) && !(t.ctrlKey && t.altKey && !t.metaKey && t.key.length === 1) && (t.ctrlKey || t.metaKey);
}
class Cc {
  constructor(e, r) {
    this.data = e, this.saveCallback = r, this.editInput = null, this.element = null, this.editCell = void 0;
  }
  async componentDidRender() {
    var e;
    this.editInput && (await Ae(), (e = this.editInput) === null || e === void 0 || e.focus());
  }
  onKeyDown(e) {
    const r = Hs(e.key), i = As(e.key);
    (i || r) && e.target && this.saveCallback && !e.isComposing && (this.beforeDisconnect(), this.saveCallback(this.getValue(), i));
  }
  beforeDisconnect() {
    var e;
    (e = this.editInput) === null || e === void 0 || e.blur();
  }
  getValue() {
    var e;
    return (e = this.editInput) === null || e === void 0 ? void 0 : e.value;
  }
  render(e, r) {
    var i, o;
    return e("input", { type: "text", enterKeyHint: "enter", value: (o = (i = this.editCell) === null || i === void 0 ? void 0 : i.val) !== null && o !== void 0 ? o : "", ref: (s) => {
      this.editInput = s;
    }, onKeyDown: (s) => this.onKeyDown(s) });
  }
}
function Ms(t) {
  return !!t?.closest(`.${es}`);
}
function $c(t) {
  return typeof t == "function" && typeof t.prototype == "object";
}
const Rc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.cellEdit = m(this, "celleditinit", 7), this.closeEdit = m(this, "closeedit", 7), this.saveOnClose = !1, this.currentEditor = null, this.preventSaveOnClose = !1;
  }
  async cancelChanges() {
    this.preventSaveOnClose = !0;
  }
  async beforeDisconnect() {
    var t, e;
    (e = (t = this.currentEditor) === null || t === void 0 ? void 0 : t.beforeDisconnect) === null || e === void 0 || e.call(t);
  }
  onAutoSave() {
    var t, e, r;
    this.preventSaveOnClose = !0;
    const i = (e = (t = this.currentEditor) === null || t === void 0 ? void 0 : t.getValue) === null || e === void 0 ? void 0 : e.call(t);
    !((r = this.currentEditor) === null || r === void 0) && r.beforeAutoSave && this.currentEditor.beforeAutoSave(i) === !1 || this.onSave(i, !0);
  }
  onSave(t, e) {
    this.preventSaveOnClose = !0, this.editCell && this.cellEdit.emit({ rgCol: this.editCell.x, rgRow: this.editCell.y, type: this.editCell.type, prop: this.editCell.prop, val: t, preventFocus: e });
  }
  componentWillRender() {
    !this.currentEditor && this.column && (this.preventSaveOnClose = !1, this.currentEditor = this.editor ? $c(this.editor) ? new this.editor(this.column, ((t, e) => {
      this.onSave(t, e);
    }), ((t) => {
      this.preventSaveOnClose = !0, this.closeEdit.emit(t);
    })) : this.editor(this.column, ((t, e) => {
      this.onSave(t, e);
    }), ((t) => {
      this.preventSaveOnClose = !0, this.closeEdit.emit(t);
    })) : new Cc(this.column, ((t, e) => this.onSave(t, e))));
  }
  componentDidRender() {
    var t, e;
    this.currentEditor && (this.currentEditor.element = this.element.firstElementChild, (e = (t = this.currentEditor).componentDidRender) === null || e === void 0 || e.call(t));
  }
  disconnectedCallback() {
    var t, e;
    this.saveOnClose && (this.preventSaveOnClose || this.onAutoSave()), this.preventSaveOnClose = !1, this.currentEditor && ((e = (t = this.currentEditor).disconnectedCallback) === null || e === void 0 || e.call(t), this.currentEditor.element = null, this.currentEditor = null);
  }
  render() {
    return this.currentEditor ? (this.currentEditor.editCell = this.editCell, f(M, { class: es }, this.currentEditor.render(f, this.additionalData))) : "";
  }
  get element() {
    return this;
  }
  static get style() {
    return "revogr-edit{display:block;position:absolute;background-color:var(--revo-grid-background, #fff)}revogr-edit input{height:100%;width:100%;box-sizing:border-box;background-color:var(--revo-grid-background, transparent)}revogr-edit revo-dropdown{height:100%}revogr-edit revo-dropdown.shrink fieldset legend>span{display:none}";
  }
}, [0, "revogr-edit", { editCell: [16], column: [16], editor: [16], saveOnClose: [4, "save-on-close"], additionalData: [8, "additional-data"], cancelChanges: [64], beforeDisconnect: [64] }]);
function Ns() {
  typeof customElements < "u" && ["revogr-edit"].forEach(((t) => {
    t === "revogr-edit" && (customElements.get(t) || customElements.define(t, Rc));
  }));
}
const Oc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.nodes = [], this.update = 1;
  }
  async refresh() {
    this.update *= -1;
  }
  render() {
    var t;
    return (t = this.nodes) === null || t === void 0 ? void 0 : t.map(((e) => {
      if (typeof e == "function") {
        const r = {}, i = () => [e({ refresh: () => {
          var o;
          return (o = r.refresh) === null || o === void 0 ? void 0 : o.call(r);
        } })];
        return f("revogr-extra", { nodes: i(), ref: (o) => {
          o && (r.refresh = () => {
            o.nodes = i();
          });
        } });
      }
      return e;
    }));
  }
}, [0, "revogr-extra", { nodes: [16], update: [32], refresh: [64] }]);
function Bs() {
  typeof customElements < "u" && ["revogr-extra", "revogr-extra"].forEach(((t) => {
    switch (t) {
      case "revogr-extra":
        customElements.get(t) || customElements.define(t, Oc);
        break;
      case "revogr-extra":
        customElements.get(t) || Bs();
    }
  }));
}
const zc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.beforeFocusRender = m(this, "beforefocusrender", 7), this.beforeScrollIntoView = m(this, "beforescrollintoview", 7), this.afterFocus = m(this, "afterfocus", 7), this.focusTemplate = null, this.activeFocus = null;
  }
  componentDidRender() {
    var t, e;
    const r = this.selectionStore.get("focus");
    if ((((t = this.activeFocus) === null || t === void 0 ? void 0 : t.x) !== r?.x || ((e = this.activeFocus) === null || e === void 0 ? void 0 : e.y) !== r?.y) && (this.activeFocus = r, r && this.el)) {
      this.beforeScrollIntoView.emit({ el: this.el }).defaultPrevented || this.el.scrollIntoView({ block: "nearest", inline: "nearest" });
      const i = _(this.dataStore, r.y), o = _(this.colData, r.x);
      this.afterFocus.emit({ model: i, column: o, rowType: this.rowType, colType: this.colType, rowIndex: r.y, colIndex: r.x });
    }
  }
  render() {
    var t;
    if (this.selectionStore.get("edit")) return;
    const e = this.selectionStore.get("focus");
    if (!e) return;
    const r = this.beforeFocusRender.emit({ range: Object.assign(Object.assign({}, e), { x1: e.x, y1: e.y }), rowType: this.rowType, colType: this.colType, rowDimension: Object.assign({}, this.dimensionRow.state), colDimension: Object.assign({}, this.dimensionCol.state) });
    if (r.defaultPrevented) return f("slot", null);
    const { detail: i } = r, o = tt(i.range, r.detail.rowDimension, r.detail.colDimension), s = Dt(o), n = (t = this.focusTemplate) === null || t === void 0 ? void 0 : t.call(this, f, i);
    return f(M, Object.assign({}, { class: { [Qo]: !0 }, style: s }), f("slot", null), n);
  }
  get el() {
    return this;
  }
  static get style() {
    return "revogr-focus.focused-cell{box-shadow:-1px 0 0 #0d63e8 inset, 1px 0 0 #0d63e8 inset, 0 -1px 0 #0d63e8 inset, 0 1px 0 #0d63e8 inset;position:absolute;pointer-events:none;z-index:9;display:block !important}";
  }
}, [260, "revogr-focus", { colType: [1, "col-type"], rowType: [1, "row-type"], selectionStore: [16], dimensionRow: [16], dimensionCol: [16], dataStore: [16], colData: [16], focusTemplate: [16] }]);
function Ec() {
  typeof customElements < "u" && ["revogr-focus"].forEach(((t) => {
    t === "revogr-focus" && (customElements.get(t) || customElements.define(t, zc));
  }));
}
class Dc {
  constructor(e) {
    this.config = e, this.currentCell = null, this.previousRow = null;
  }
  endOrder(e, r) {
    if (this.currentCell === null) return;
    const i = this.getCell(e, r);
    i.y < 0 ? i.y = 0 : i.y < this.currentCell.y && i.y++, i.y !== this.currentCell.y && this.config.positionChanged(this.currentCell.y, i.y), this.clear();
  }
  startOrder(e, r) {
    return this.currentCell = this.getCell(e, r), this.currentCell;
  }
  move(e, r) {
    const i = this.getRow(e, r);
    return this.previousRow === i.itemIndex || i.itemIndex < -1 ? null : (this.previousRow = i.itemIndex, i);
  }
  clear() {
    this.currentCell = null, this.previousRow = null;
  }
  getRow(e, { el: r, rows: i }) {
    const { top: o } = r.getBoundingClientRect(), s = i.renderOffset || 0, n = ee(i, e - o + s);
    return { itemIndex: n.itemIndex, start: n.start - s + o, end: n.end - s + o };
  }
  getCell({ x: e, y: r }, { el: i, rows: o, cols: s }) {
    const { top: n, left: l } = i.getBoundingClientRect(), a = e - l, c = ee(o, r - n + (o.renderOffset || 0));
    return { x: ee(s, a + (s.renderOffset || 0)).itemIndex, y: c.itemIndex };
  }
}
const Tc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.rowDragStart = m(this, "rowdragstartinit", 7), this.rowDragEnd = m(this, "rowdragendinit", 7), this.rowDrag = m(this, "rowdragmoveinit", 7), this.rowMouseMove = m(this, "rowdragmousemove", 7), this.rowDropped = m(this, "rowdropinit", 7), this.rowOrderChange = m(this, "roworderchange", 7), this.events = [], this.rowMoveFunc = Ce(((e) => {
      const r = this.rowOrderService.move(e, this.getData());
      r !== null && this.rowDrag.emit(Object.assign(Object.assign({}, r), { rowType: this.rowType }));
    }), 5);
  }
  async dragStart(t) {
    t.originalEvent.preventDefault(), this.events.length && this.clearOrder();
    const e = this.getData(), r = this.rowOrderService.startOrder(t.originalEvent, e), i = this.rowOrderService.getRow(t.originalEvent.y, e);
    if (this.rowDragStart.emit({ cell: r, text: ga, pos: i, event: t.originalEvent, rowType: this.rowType, model: _(this.dataStore, i.itemIndex) }).defaultPrevented) return;
    const o = (l) => this.move(l), s = (l) => this.endOrder(l), n = () => this.clearOrder();
    this.events.push({ name: "mousemove", listener: o }, { name: "mouseup", listener: s }, { name: "mouseleave", listener: n }), document.addEventListener("mousemove", o), document.addEventListener("mouseup", s), document.addEventListener("mouseleave", n);
  }
  async endOrder(t) {
    this.rowOrderService.endOrder(t, this.getData()), this.clearOrder();
  }
  async clearOrder() {
    this.rowOrderService.clear(), this.events.forEach(((t) => document.removeEventListener(t.name, t.listener))), this.events.length = 0, this.rowDragEnd.emit({ rowType: this.rowType });
  }
  move({ x: t, y: e }) {
    this.rowMouseMove.emit({ x: t, y: e, rowType: this.rowType }), this.rowMoveFunc(e);
  }
  connectedCallback() {
    this.rowOrderService = new Dc({ positionChanged: (t, e) => {
      const r = this.rowDropped.emit({ from: t, to: e, rowType: this.rowType });
      r.defaultPrevented || this.rowOrderChange.emit(r.detail);
    } });
  }
  getData() {
    return { el: this.parent, rows: this.dimensionRow.state, cols: this.dimensionCol.state };
  }
}, [0, "revogr-order-editor", { parent: [16], dimensionRow: [16], dimensionCol: [16], dataStore: [16], rowType: [1, "row-type"], dragStart: [64], endOrder: [64], clearOrder: [64] }]);
function Ws() {
  typeof customElements < "u" && ["revogr-order-editor"].forEach(((t) => {
    t === "revogr-order-editor" && (customElements.get(t) || customElements.define(t, Tc));
  }));
}
const kc = [T.TAB, T.ARROW_UP, T.ARROW_DOWN, T.ARROW_LEFT, T.ARROW_RIGHT];
class Pc {
  constructor(e) {
    this.sv = e;
  }
  appendPendingEditValue(e) {
    if (ro(e) || e.key.length !== 1 || e.target instanceof HTMLElement && Ms(e.target)) return !1;
    const r = this.sv.selectionStore.get("edit");
    return typeof r?.val == "string" && (e.preventDefault(), this.sv.selectionStore.set("edit", Object.assign(Object.assign({}, r), { val: `${r.val}${e.key}` })), !0);
  }
  async keyDown(e, r, i, { range: o, focus: s }) {
    if (i) {
      if (this.appendPendingEditValue(e)) return;
      switch (e.code) {
        case T.ESCAPE:
          this.sv.cancel();
          break;
        case T.TAB:
          this.keyChangeSelection(e, r);
      }
    } else o && yc(e.code) ? this.sv.clearCell() : s && (As(e.code) ? this.keyChangeSelection(e, r) : Hs(e.key) ? this.sv.change() : Sc(e) || bc(e) || (wc(e) ? this.sv.internalPaste() : xc(e) ? r && this.selectAll(e) : ro(e) || e.key.length !== 1 ? await this.keyChangeSelection(e, r) : this.sv.change(e.key) && e.preventDefault()));
  }
  selectAll(e) {
    const r = this.sv.selectionStore.get("range"), i = this.sv.selectionStore.get("focus");
    r && i && (e.preventDefault(), this.sv.selectAll());
  }
  async keyChangeSelection(e, r) {
    const i = this.changeDirectionKey(e, r);
    if (!i) return !1;
    await Ae(Yo + 30);
    const o = this.sv.selectionStore.get("range"), s = this.sv.selectionStore.get("focus");
    return this.keyPositionChange(i.changes, o, s, i.isMulti);
  }
  keyPositionChange(e, r, i, o = !1) {
    if (!r || !i) return !1;
    const s = pc(r, i, e, o);
    if (!s) return !1;
    const n = this.sv.getData();
    if (o) {
      if ([s.start, s.end].some(((a) => Et(a, n.lastCell) || to(a)))) return !1;
      const l = Q(s.start, s.end);
      return this.sv.range(l);
    }
    return this.sv.focus(s.start, e, Et(s.start, n.lastCell) ? 1 : to(s.start) ? -1 : 0);
  }
  changeDirectionKey(e, r) {
    const i = r && e.shiftKey;
    if (kc.includes(e.code) && e.preventDefault(), e.shiftKey && e.code === T.TAB) return { changes: { x: -1 }, isMulti: !1 };
    switch (e.code) {
      case T.ARROW_UP:
        return { changes: { y: -1 }, isMulti: i };
      case T.ARROW_DOWN:
        return { changes: { y: 1 }, isMulti: i };
      case T.ARROW_LEFT:
        return { changes: { x: -1 }, isMulti: i };
      case T.TAB:
      case T.ARROW_RIGHT:
        return { changes: { x: 1 }, isMulti: i };
    }
  }
}
class jc {
  constructor(e) {
    this.sv = e, this.autoFillType = null, this.autoFillInitial = null, this.autoFillStart = null, this.autoFillLast = null;
  }
  renderAutofill(e, r, i = !1) {
    let o;
    return o = tt(e || Object.assign(Object.assign({}, r), { x1: r.x, y1: r.y }), this.sv.dimensionRow.state, this.sv.dimensionCol.state), f("div", { class: { [ua]: !0, [Le]: i }, style: { left: `${o.right}px`, top: `${o.bottom}px` }, onMouseDown: (s) => this.autoFillHandler(s), onTouchStart: (s) => this.autoFillHandler(s) });
  }
  autoFillHandler(e, r = "AutoFill") {
    let i = null;
    e.target instanceof Element && (i = e.target), i && (this.selectionStart(i, this.sv.getData(), r), e.preventDefault());
  }
  get isAutoFill() {
    return !!this.autoFillType;
  }
  selectionMouseMove(e) {
    this.onMouseMoveAutofill || (this.onMouseMoveAutofill = Ce(((r, i) => this.doAutofillMouseMove(r, i)), 5)), this.isAutoFill && this.onMouseMoveAutofill(e, this.sv.getData());
  }
  getFocus(e, r) {
    return !e && r && (e = { x: r.x, y: r.y }), e || null;
  }
  doAutofillMouseMove(e, r) {
    if (!this.autoFillInitial) return;
    const i = ce(e, "clientX", Le), o = ce(e, "clientY", Le);
    if (i === null || o === null) return;
    const s = Cr({ x: i, y: o }, r);
    if (this.autoFillLast || this.autoFillLast || (this.autoFillLast = this.autoFillStart), !Et(s, r.lastCell)) if (this.autoFillLast = s, s.x === this.autoFillInitial.x && s.y === this.autoFillInitial.y) this.sv.setTempRange(null);
    else {
      const n = Q(this.autoFillInitial, this.autoFillLast);
      this.sv.setTempRange({ area: n, type: this.autoFillType });
    }
  }
  selectionStart(e, r, i = "Selection") {
    const { top: o, left: s } = e.getBoundingClientRect();
    this.autoFillInitial = this.getFocus(r.focus, r.range), this.autoFillType = i, this.autoFillStart = Cr({ x: s, y: o }, r);
  }
  clearAutoFillSelection(e, r) {
    if (this.autoFillInitial) if (this.autoFillInitial = this.getFocus(e, r), this.autoFillType === "AutoFill") {
      const i = Q(this.autoFillInitial, this.autoFillLast);
      if (i) {
        const { defaultPrevented: o, detail: { range: s } } = this.sv.clearRangeDataApply({ range: i });
        !o && r ? this.applyRangeWithData(s, r) : this.sv.setTempRange(null);
      }
    } else this.applyRangeOnly(this.autoFillInitial, this.autoFillLast);
    this.resetAutoFillState();
  }
  resetAutoFillState() {
    this.autoFillType = null, this.autoFillInitial = null, this.autoFillLast = null, this.autoFillStart = null;
  }
  onRangeApply(e, r, i) {
    this.sv.rangeDataApply({ data: e, models: Is(e, this.sv.dataStore), type: this.sv.dataStore.get("type"), oldRange: i, newRange: r }), this.sv.setRange(r);
  }
  applyRangeWithData(e, r) {
    const i = { type: this.sv.dataStore.get("type"), colType: this.sv.columnService.type, newData: {}, mapping: {}, newRange: e, oldRange: r }, { mapping: o, changed: s } = this.sv.columnService.getRangeData(i, this.sv.columnService.columns);
    i.newData = s, i.mapping = o;
    let n = this.sv.selectionChanged(i);
    n.defaultPrevented ? this.sv.setTempRange(null) : (n = this.sv.rangeCopy(i), n.defaultPrevented ? this.sv.setRange(e) : this.onRangeApply(i.newData, e, r));
  }
  applyRangeOnly(e, r) {
    if (!e || !r) return;
    const i = Q(e, r);
    this.sv.setRange(i);
  }
}
const Lc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.beforeCopyRegion = m(this, "beforecopyregion", 7), this.beforeRegionPaste = m(this, "beforepasteregion", 7), this.cellEditApply = m(this, "celleditapply", 7), this.beforeFocusCell = m(this, "beforecellfocusinit", 7), this.beforeNextViewportFocus = m(this, "beforenextvpfocus", 7), this.setEdit = m(this, "setedit", 7), this.beforeApplyRange = m(this, "beforeapplyrange", 7), this.beforeSetRange = m(this, "beforesetrange", 7), this.setRange = m(this, "setrange", 7), this.beforeEditRender = m(this, "beforeeditrender", 7), this.selectAll = m(this, "selectall", 7), this.cancelEdit = m(this, "canceledit", 7), this.setTempRange = m(this, "settemprange", 7), this.beforeSetTempRange = m(this, "beforesettemprange", 7), this.applyFocus = m(this, "applyfocus", 7), this.focusCell = m(this, "focuscell", 7), this.beforeRangeDataApply = m(this, "beforerangedataapply", 7), this.selectionChange = m(this, "selectionchangeinit", 7), this.beforeRangeCopyApply = m(this, "beforerangecopyapply", 7), this.rangeEditApply = m(this, "rangeeditapply", 7), this.rangeClipboardCopy = m(this, "clipboardrangecopy", 7), this.rangeClipboardPaste = m(this, "clipboardrangepaste", 7), this.beforeKeyDown = m(this, "beforekeydown", 7), this.beforeKeyUp = m(this, "beforekeyup", 7), this.beforeCellSave = m(this, "beforecellsave", 7), this.cellEditDone = m(this, "celledit", 7), this.applyChangesOnClose = !1, this.keyboardService = null, this.autoFillService = null, this.unsubscribeSelectionStore = [];
  }
  onMouseMove(t) {
    var e;
    this.selectionStore.get("focus") && ((e = this.autoFillService) === null || e === void 0 || e.selectionMouseMove(t));
  }
  onMouseUp() {
    var t;
    (t = this.autoFillService) === null || t === void 0 || t.clearAutoFillSelection(this.selectionStore.get("focus"), this.selectionStore.get("range"));
  }
  onCellDrag(t) {
    var e;
    (e = this.orderEditor) === null || e === void 0 || e.dragStart(t.detail);
  }
  onKeyUp(t) {
    this.beforeKeyUp.emit(Object.assign({ original: t }, this.getData()));
  }
  onKeyDown(t) {
    var e;
    const r = this.beforeKeyDown.emit(Object.assign({ original: t }, this.getData()));
    t.defaultPrevented || r.defaultPrevented || (e = this.keyboardService) === null || e === void 0 || e.keyDown(t, this.range, !!this.selectionStore.get("edit"), { focus: this.selectionStore.get("focus"), range: this.selectionStore.get("range") });
  }
  selectionServiceSet(t) {
    this.unsubscribeSelectionStore.forEach(((e) => e())), this.unsubscribeSelectionStore.length = 0, this.unsubscribeSelectionStore.push(t.onChange("nextFocus", ((e) => e && this.doFocus(e, e)))), this.keyboardService = new Pc({ selectionStore: t, range: (e) => !!e && this.triggerRangeEvent(e), focus: (e, r, i) => i ? (this.beforeNextViewportFocus.emit(e), !1) : this.doFocus(e, e, r), change: (e) => this.doEdit(e), cancel: async () => {
      var e;
      await ((e = this.revogrEdit) === null || e === void 0 ? void 0 : e.cancelChanges()), this.closeEdit();
    }, clearCell: () => !this.readonly && this.clearCell(), internalPaste: () => !this.readonly && this.beforeRegionPaste.emit(), getData: () => this.getData(), selectAll: () => this.selectAll.emit() }), this.createAutoFillService();
  }
  createAutoFillService() {
    this.autoFillService = new jc({ dimensionRow: this.dimensionRow, dimensionCol: this.dimensionCol, columnService: this.columnService, dataStore: this.dataStore, clearRangeDataApply: (t) => this.beforeRangeDataApply.emit(Object.assign(Object.assign(Object.assign({}, t), this.types), { rowDimension: Object.assign({}, this.dimensionRow.state), colDimension: Object.assign({}, this.dimensionCol.state) })), setTempRange: (t) => {
      const e = this.beforeSetTempRange.emit(Object.assign(Object.assign({ tempRange: t }, this.getData()), this.types));
      return e.defaultPrevented ? null : this.setTempRange.emit(e.detail.tempRange);
    }, selectionChanged: (t) => this.selectionChange.emit(t), rangeCopy: (t) => this.beforeRangeCopyApply.emit(t), rangeDataApply: (t) => this.rangeEditApply.emit(t), setRange: (t) => !!t && this.triggerRangeEvent(t), getData: () => this.getData() });
  }
  columnServiceSet() {
    var t;
    (t = this.columnService) === null || t === void 0 || t.destroy(), this.columnService = new us(this.dataStore, this.colData), this.createAutoFillService();
  }
  connectedCallback() {
    this.columnServiceSet(), this.selectionServiceSet(this.selectionStore);
  }
  disconnectedCallback() {
    var t;
    this.unsubscribeSelectionStore.forEach(((e) => e())), this.unsubscribeSelectionStore.length = 0, (t = this.columnService) === null || t === void 0 || t.destroy();
  }
  async componentWillRender() {
    var t, e;
    this.selectionStore.get("edit") || await ((e = (t = this.revogrEdit) === null || t === void 0 ? void 0 : t.beforeDisconnect) === null || e === void 0 ? void 0 : e.call(t));
  }
  renderRange(t) {
    const e = tt(t, this.dimensionRow.state, this.dimensionCol.state), r = Dt(e);
    return [f("div", { class: da, style: r }, this.isMobileDevice && f("div", { class: "range-handlers" }, f("span", { class: Le }), f("span", { class: Le })))];
  }
  renderEditor() {
    const t = this.selectionStore.get("edit");
    if (this.readonly || !t) return null;
    const e = t.val || Ot(this.columnService.rowDataModel(t.y, t.x).value), r = Object.assign(Object.assign({}, t), this.columnService.getSaveData(t.y, t.x, e)), i = this.beforeEditRender.emit(Object.assign(Object.assign({ range: Object.assign(Object.assign({}, t), { x1: t.x, y1: t.y }) }, this.types), { rowDimension: Object.assign({}, this.dimensionRow.state), colDimension: Object.assign({}, this.dimensionCol.state) }));
    if (i.defaultPrevented) return null;
    const o = tt(i.detail.range, i.detail.rowDimension, i.detail.colDimension), s = Dt(o);
    return f("revogr-edit", { style: s, ref: (n) => this.revogrEdit = n, additionalData: this.additionalData, editCell: r, saveOnClose: this.applyChangesOnClose, onCelleditinit: (n) => {
      this.cellEditDone.emit(n.detail);
    }, column: this.columnService.rowDataModel(t.y, t.x), editor: Ra(this.columnService.columns[t.x], this.editors) });
  }
  onEditCell(t) {
    if (t.defaultPrevented) return;
    const e = this.beforeCellSave.emit(t.detail);
    e.defaultPrevented || this.cellEdit(e.detail), e.detail.preventFocus || this.focusNext();
  }
  render() {
    var t;
    const e = [], r = this.renderEditor();
    if (r) e.push(r);
    else {
      const i = this.selectionStore.get("range"), o = this.selectionStore.get("focus");
      (i || o) && this.useClipboard && e.push(f("revogr-clipboard", { readonly: this.readonly, onCopyregion: (s) => this.onCopy(s.detail), onClearregion: () => !this.readonly && this.clearCell(), ref: (s) => this.clipboard = s, onPasteregion: (s) => this.onPaste(s.detail) })), i && e.push(...this.renderRange(i)), o && !this.readonly && this.range && e.push((t = this.autoFillService) === null || t === void 0 ? void 0 : t.renderAutofill(i, o, this.isMobileDevice)), this.canDrag && e.push(f("revogr-order-editor", { ref: (s) => this.orderEditor = s, dataStore: this.dataStore, dimensionRow: this.dimensionRow, dimensionCol: this.dimensionCol, parent: this.element, rowType: this.types.rowType, onRowdragstartinit: (s) => this.rowDragStart(s) }));
    }
    return f(M, { key: "2d8dc4fd40a883fe59b24b2cfac1c370b9f0ac16", class: { mobile: this.isMobileDevice }, onDblClick: (i) => this.onElementDblClick(i), onMouseDown: (i) => this.onElementMouseDown(i), onTouchStart: (i) => this.onElementMouseDown(i, !0), onCloseedit: (i) => this.closeEdit(i), onCelledit: (i) => this.onEditCell(i) }, e, f("slot", { key: "8ad5df55904ca6a8b2fb0e69c5f608ec7264a0f1", name: "data" }));
  }
  doFocus(t, e, r, i) {
    const { defaultPrevented: o } = this.beforeFocusCell.emit(Object.assign(Object.assign({}, this.columnService.getSaveData(t.y, t.x)), { originalEvent: i }));
    if (o) return !1;
    const s = Object.assign(Object.assign({ range: Object.assign(Object.assign({}, t), { x1: e.x, y1: e.y }), next: r }, this.types), { rowDimension: Object.assign({}, this.dimensionRow.state), colDimension: Object.assign({}, this.dimensionCol.state), originalEvent: i }), n = this.applyFocus.emit(s);
    if (n.defaultPrevented) return !1;
    const { range: l } = n.detail;
    return !this.focusCell.emit(Object.assign({ focus: { x: l.x, y: l.y }, end: { x: l.x1, y: l.y1 } }, n.detail)).defaultPrevented;
  }
  triggerRangeEvent(t, e) {
    const r = this.types.rowType, i = this.beforeApplyRange.emit(Object.assign(Object.assign({ range: Object.assign({}, t) }, this.types), { rowDimension: Object.assign({}, this.dimensionRow.state), colDimension: Object.assign({}, this.dimensionCol.state), originalEvent: e }));
    if (i.defaultPrevented) return !1;
    const o = this.columnService.getRangeTransformedToProps(i.detail.range, this.dataStore);
    let s = this.beforeSetRange.emit(o);
    return !s.defaultPrevented && (s = this.setRange.emit(Object.assign(Object.assign({}, i.detail.range), { type: r })), !s.defaultPrevented && !s.defaultPrevented);
  }
  onElementDblClick(t) {
    if (t.defaultPrevented) return;
    const e = this.getData();
    eo(t, e) && this.doEdit();
  }
  onElementMouseDown(t, e = !1) {
    var r;
    const i = t.target;
    if (Ms(i) || t.defaultPrevented) return;
    const o = this.getData(), s = eo(t, o);
    s && (this.focus(s, this.range && t.shiftKey, t), this.range && (i && ((r = this.autoFillService) === null || r === void 0 || r.selectionStart(i, this.getData())), e ? Fs(t.touches[0], Le) && t.preventDefault() : t.preventDefault()));
  }
  doEdit(t = "") {
    if (!this.canEdit()) return !1;
    const e = this.selectionStore.get("focus");
    if (!e) return !1;
    const r = this.columnService.getSaveData(e.y, e.x);
    return !this.setEdit.emit(Object.assign(Object.assign({}, r), { val: t })).defaultPrevented;
  }
  async closeEdit(t) {
    this.cancelEdit.emit(), t?.detail && await this.focusNext();
  }
  cellEdit(t) {
    const e = this.columnService.getSaveData(t.rgRow, t.rgCol, t.val);
    this.cellEditApply.emit(e);
  }
  getRegion() {
    const t = this.selectionStore.get("focus");
    let e = this.selectionStore.get("range");
    return e || (e = Q(t, t)), e;
  }
  onCopy(t) {
    var e;
    const r = this.getRegion();
    if (this.beforeCopyRegion.emit(r).defaultPrevented) return !1;
    let i;
    if (r) {
      const { data: o, mapping: s } = this.columnService.copyRangeArray(r, this.dataStore), n = this.rangeClipboardCopy.emit(Object.assign({ range: r, data: o, mapping: s }, this.types));
      n.defaultPrevented || (i = n.detail.data);
    }
    return (e = this.clipboard) === null || e === void 0 || e.doCopy(t, i), !0;
  }
  onPaste(t) {
    var e;
    const r = this.selectionStore.get("focus"), i = this.selectionStore.get("edit") !== null;
    if (!r || i) return;
    const o = (function(c, d) {
      var h;
      if (!(function(g) {
        return typeof g == "object" && g.rangeFill === !0;
      })(d)) return null;
      const u = (function(g) {
        const p = [...g];
        for (; p.length > 1 && (!(v = p[p.length - 1]) || v.every(((y) => y === ""))); ) p.pop();
        var v;
        return p;
      })(c);
      return u.length === 1 && ((h = u[0]) === null || h === void 0 ? void 0 : h.length) === 1 ? u : null;
    })(t, this.useClipboard), s = o ? this.getClipboardPasteTargetRange() : null;
    let { changed: n, range: l } = this.columnService.getTransformedDataToApply({ start: r, data: o || t, targetRange: s });
    const { defaultPrevented: a } = this.rangeClipboardPaste.emit(Object.assign({ data: n, models: Is(n, this.dataStore), range: l }, this.types));
    a || (e = this.autoFillService) === null || e === void 0 || e.onRangeApply(n, l, l);
  }
  getClipboardPasteTargetRange() {
    const t = this.selectionStore.get("range");
    return t && !Ki(t) ? t : null;
  }
  async focusNext() {
    var t;
    await ((t = this.keyboardService) === null || t === void 0 ? void 0 : t.keyChangeSelection(new KeyboardEvent("keydown", { code: T.ARROW_DOWN }), this.range)) || this.closeEdit();
  }
  clearCell() {
    var t;
    const e = this.selectionStore.get("range");
    if (e && !Ki(e)) {
      const r = this.columnService.getRangeStaticData(e, "");
      (t = this.autoFillService) === null || t === void 0 || t.onRangeApply(r, e, e);
    } else if (this.canEdit()) {
      const r = this.selectionStore.get("focus");
      if (!r) return;
      const i = this.columnService.getSaveData(r.y, r.x);
      this.cellEdit({ rgRow: r.y, rgCol: r.x, val: "", type: i.type, prop: i.prop });
    }
  }
  rowDragStart({ detail: t }) {
    t.text = Ot(this.columnService.rowDataModel(t.cell.y, t.cell.x).value);
  }
  canEdit() {
    var t;
    if (this.readonly) return !1;
    const e = this.selectionStore.get("focus");
    return e && !(!((t = this.columnService) === null || t === void 0) && t.isReadOnly(e.y, e.x));
  }
  get edited() {
    return this.selectionStore.get("edit");
  }
  focus(t, e = !1, r) {
    if (!t) return !1;
    const i = t, o = this.selectionStore.get("focus");
    if (e && o) {
      const s = Q(o, i);
      if (s) return this.triggerRangeEvent(s, r);
    }
    return this.doFocus(t, i, void 0, r);
  }
  get types() {
    return { rowType: this.dataStore.get("type"), colType: this.columnService.type };
  }
  getData() {
    return { el: this.element, rows: this.dimensionRow.state, cols: this.dimensionCol.state, lastCell: this.lastCell, focus: this.selectionStore.get("focus"), range: this.selectionStore.get("range"), edit: this.selectionStore.get("edit") };
  }
  get element() {
    return this;
  }
  static get watchers() {
    return { selectionStore: [{ selectionServiceSet: 0 }], dimensionRow: [{ createAutoFillService: 0 }], dimensionCol: [{ createAutoFillService: 0 }], dataStore: [{ columnServiceSet: 0 }], colData: [{ columnServiceSet: 0 }] };
  }
  static get style() {
    return 'revogr-overlay-selection{display:block;position:relative;width:100%}revogr-overlay-selection .autofill-handle{position:absolute;width:14px;height:14px;margin-left:-13px;margin-top:-13px;z-index:10;cursor:crosshair}revogr-overlay-selection .autofill-handle::before{content:"";position:absolute;right:0;bottom:0;width:10px;height:10px;background:#0d63e8;border:1px solid white;box-sizing:border-box}revogr-overlay-selection.mobile .autofill-handle{position:absolute;width:30px;height:30px;margin-left:-29px;margin-top:-29px;z-index:10;cursor:crosshair}revogr-overlay-selection.mobile .autofill-handle::before{content:"";position:absolute;right:0;bottom:0;width:12px;height:12px;background:#0d63e8;border:1px solid white;box-sizing:border-box}revogr-overlay-selection .selection-border-range{position:absolute;pointer-events:none;z-index:9;box-shadow:-1px 0 0 #0d63e8 inset, 1px 0 0 #0d63e8 inset, 0 -1px 0 #0d63e8 inset, 0 1px 0 #0d63e8 inset}revogr-overlay-selection .selection-border-range .range-handlers{height:100%;background-color:transparent;width:75%;max-width:50px;min-width:20px;left:50%;transform:translateX(-50%);position:absolute}revogr-overlay-selection .selection-border-range .range-handlers>span{pointer-events:auto;height:20px;width:20px;position:absolute;left:50%;transform:translateX(-50%)}revogr-overlay-selection .selection-border-range .range-handlers>span:before,revogr-overlay-selection .selection-border-range .range-handlers>span:after{position:absolute;border-radius:5px;width:15px;height:5px;left:50%;transform:translateX(-50%);background-color:rgba(0, 0, 0, 0.2)}revogr-overlay-selection .selection-border-range .range-handlers>span:first-child{top:-7px}revogr-overlay-selection .selection-border-range .range-handlers>span:first-child:before{content:"";top:0}revogr-overlay-selection .selection-border-range .range-handlers>span:last-child{bottom:-7px}revogr-overlay-selection .selection-border-range .range-handlers>span:last-child:after{content:"";bottom:0}revogr-overlay-selection revogr-edit{z-index:10}';
  }
}, [260, "revogr-overlay-selection", { readonly: [4], range: [4], canDrag: [4, "can-drag"], useClipboard: [4, "use-clipboard"], selectionStore: [16], dimensionRow: [16], dimensionCol: [16], dataStore: [16], colData: [16], lastCell: [16], editors: [16], applyChangesOnClose: [4, "apply-changes-on-close"], additionalData: [8, "additional-data"], isMobileDevice: [4, "is-mobile-device"] }, [[5, "touchmove", "onMouseMove"], [5, "mousemove", "onMouseMove"], [5, "touchend", "onMouseUp"], [5, "mouseup", "onMouseUp"], [5, "mouseleave", "onMouseUp"], [0, "dragstartcell", "onCellDrag"], [4, "keyup", "onKeyUp"], [4, "keydown", "onKeyDown"]], { selectionStore: [{ selectionServiceSet: 0 }], dimensionRow: [{ createAutoFillService: 0 }], dimensionCol: [{ createAutoFillService: 0 }], dataStore: [{ columnServiceSet: 0 }], colData: [{ columnServiceSet: 0 }] }]);
function Fc() {
  typeof customElements < "u" && ["revogr-overlay-selection", "revogr-clipboard", "revogr-edit", "revogr-order-editor"].forEach(((t) => {
    switch (t) {
      case "revogr-overlay-selection":
        customElements.get(t) || customElements.define(t, Lc);
        break;
      case "revogr-clipboard":
        customElements.get(t) || _s();
        break;
      case "revogr-edit":
        customElements.get(t) || Ns();
        break;
      case "revogr-order-editor":
        customElements.get(t) || Ws();
    }
  }));
}
class Ic {
  constructor(e) {
    this.element = e, this.autohideScrollTimeout = 0;
  }
  setScrollSize(e) {
    e ? this.element.removeAttribute("autohide") : this.element.setAttribute("autohide", "true");
  }
  checkScroll({ scrollSize: e, contentSize: r, virtualSize: i }) {
    !e && r > i && (this.element.setAttribute("visible", "true"), this.autohideScrollTimeout = this.show(this.element, this.autohideScrollTimeout));
  }
  show(e, r) {
    return clearTimeout(r), Number(setTimeout((() => {
      e?.removeAttribute("visible");
    }), 1e3));
  }
  clear() {
    clearTimeout(this.autohideScrollTimeout);
  }
}
const _c = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.scrollVirtual = m(this, "scrollvirtual", 7), this.dimension = "rgRow", this.scrollSize = 0;
  }
  async setScroll(t) {
    var e;
    this.dimension === t.dimension && (this.localScrollTimer.latestScrollUpdate(t.dimension), (e = this.localScrollService) === null || e === void 0 || e.setScroll(t), t.coordinate && this.autohideScrollPlugin.checkScroll({ scrollSize: this.scrollSize, contentSize: this.realSize, virtualSize: this.virtualSize }));
  }
  async changeScroll(t) {
    return t.delta ? this.localScrollService.setScrollByDelta(t, this.element[t.dimension === "rgRow" ? "scrollTop" : "scrollLeft"]) : t;
  }
  connectedCallback() {
    this.autohideScrollPlugin = new Ic(this.element), this.localScrollTimer = new fs("ontouchstart" in document.documentElement ? 0 : 10), this.localScrollService = new ps({ runScroll: (t) => this.scrollVirtual.emit(t), applyScroll: (t) => {
      this.localScrollTimer.setCoordinate(t), this.element[t.dimension === "rgRow" ? "scrollTop" : "scrollLeft"] = t.coordinate;
    } });
  }
  disconnectedCallback() {
    this.autohideScrollPlugin.clear();
  }
  componentWillLoad() {
    this.scrollSize = Ls(document);
  }
  componentDidRender() {
    let t = 0;
    this.dimension === "rgRow" ? (t = this.element.scrollHeight > this.element.clientHeight ? this.scrollSize : 0, this.element.style.minWidth = `${t}px`) : (t = this.element.scrollWidth > this.element.clientWidth ? this.scrollSize : 0, this.element.style.minHeight = `${t}px`), this.autohideScrollPlugin.setScrollSize(t), this.localScrollService.setParams({ contentSize: this.realSize, clientSize: this.dimension === "rgRow" ? this.element.clientHeight : this.element.clientWidth, virtualSize: this.clientSize }, this.dimension);
  }
  onScroll(t) {
    if (!(t.target instanceof Element)) return;
    const e = t.target;
    let r = "scrollLeft";
    this.dimension === "rgRow" && (r = "scrollTop");
    const i = () => {
      var o;
      (o = this.localScrollService) === null || o === void 0 || o.scroll(e[r] || 0, this.dimension);
    };
    this.localScrollTimer.isReady(this.dimension, e[r]) ? i() : this.localScrollTimer.throttleLastScrollUpdate(this.dimension, e[r] || 0, (() => i()));
  }
  render() {
    const t = br(this.realSize, this.dimension === "rgRow" ? this.element.clientHeight : this.element.clientWidth, this.clientSize);
    return f(M, { key: "7213817ef941eee4050b714266598ec0c2961ee9", onScroll: (e) => this.onScroll(e) }, f("div", { key: "501da49c63253ab943172494b9dbf5399be56cee", style: { [this.dimension === "rgRow" ? "height" : "width"]: `${t}px` } }));
  }
  get element() {
    return this;
  }
  static get style() {
    return "revogr-scroll-virtual[autohide]{position:absolute;z-index:100 !important}revogr-scroll-virtual[autohide].vertical{top:0;right:0}revogr-scroll-virtual[autohide].vertical[visible]{min-width:20px !important}revogr-scroll-virtual[autohide].horizontal{bottom:0;left:0}revogr-scroll-virtual[autohide].horizontal[visible]{min-height:20px !important}revogr-scroll-virtual.vertical{overflow-y:auto;overflow-x:hidden;height:100%}revogr-scroll-virtual.vertical>div{width:1px}revogr-scroll-virtual.horizontal{overflow-x:auto;overflow-y:hidden;width:100%}revogr-scroll-virtual.horizontal>div{height:1px}";
  }
}, [0, "revogr-scroll-virtual", { dimension: [1], realSize: [2, "real-size"], virtualSize: [2, "virtual-size"], clientSize: [2, "client-size"], setScroll: [64], changeScroll: [64] }]);
function Ac() {
  typeof customElements < "u" && ["revogr-scroll-virtual"].forEach(((t) => {
    t === "revogr-scroll-virtual" && (customElements.get(t) || customElements.define(t, _c));
  }));
}
const Hc = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.onChange = ms(((e) => this.doChange(e)), 300);
  }
  doChange(t) {
    t?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  componentDidRender() {
    this.el && this.onChange(this.el);
  }
  render() {
    const t = this.selectionStore.get("tempRange"), e = this.selectionStore.get("tempRangeType");
    if (!t) return;
    let r = "bottom", i = "right";
    const o = this.getRange();
    if (!o) return;
    t.y < o.y && (r = "top"), t.x < o.x && (i = "left");
    const s = `${i} ${r}`, n = tt(t, this.dimensionRow.state, this.dimensionCol.state), l = Dt(n);
    return f(M, Object.assign({}, { class: { [ha]: !0, [e || ""]: !0 }, style: l, hidden: !1 }), f("div", { class: s, ref: (a) => this.el = a }));
  }
  getRange() {
    const t = this.selectionStore.get("range");
    if (t) return t;
    const e = this.selectionStore.get("focus");
    return e ? Object.assign(Object.assign({}, e), { x1: e.x, y1: e.y }) : null;
  }
  static get style() {
    return ".temp-bg-range{display:block !important;position:absolute;pointer-events:none;z-index:9;border:1px solid rgb(255, 94, 0);box-sizing:border-box}.temp-bg-range.Selection{border:1px dashed gray}.temp-bg-range>div{width:1px;height:1px;position:absolute}.temp-bg-range>div.top{top:-1px}.temp-bg-range>div.bottom{bottom:-1px}.temp-bg-range>div.left{left:-1px}.temp-bg-range>div.right{right:-1px}";
  }
}, [0, "revogr-temp-range", { selectionStore: [16], dimensionRow: [16], dimensionCol: [16] }]);
function Mc() {
  typeof customElements < "u" && ["revogr-temp-range"].forEach(((t) => {
    t === "revogr-temp-range" && (customElements.get(t) || customElements.define(t, Hc));
  }));
}
class Nc {
  constructor() {
    this.defaultRowSize = 32;
  }
}
class Bc {
  constructor() {
    this.defaultRowSize = 27;
  }
}
class Wc {
  constructor() {
    this.defaultRowSize = 42;
  }
}
const Us = "default", Uc = [Us, "material", "compact", "darkMaterial", "darkCompact"];
class Gc {
  get theme() {
    return this.currentTheme;
  }
  get rowSize() {
    return this.customRowSize || this.currentTheme.defaultRowSize;
  }
  set rowSize(e) {
    this.customRowSize = e;
  }
  constructor(e) {
    this.customRowSize = 0, this.customRowSize = e.rowSize, this.register("default");
  }
  register(e) {
    switch (Xc(e)) {
      case "material":
      case "darkMaterial":
        this.currentTheme = new Wc();
        break;
      case "compact":
      case "darkCompact":
        this.currentTheme = new Nc();
        break;
      default:
        this.currentTheme = new Bc();
    }
  }
}
function Xc(t) {
  return t && Uc.indexOf(t) > -1 ? t : Us;
}
function Vc({ count: t, originItemSize: e, sizes: r }) {
  const i = Math.max(0, t);
  let o = i * e;
  for (let s in r) {
    const n = Number(s);
    !Number.isInteger(n) || n < 0 || n >= i || n + "" !== s || (o += r[s] - e);
  }
  return o;
}
function Kt() {
  return Object.assign(Object.assign({}, { indexes: [], count: 0, trimmed: null, sizes: {}, positionIndexToItem: {}, indexToItem: {}, positionIndexes: [] }), { realSize: 0, originItemSize: 0, renderOffset: 0 });
}
class Kc {
  constructor(e) {
    this.type = e, this.store = jt(Kt()), this.store.use(/* @__PURE__ */ ((r) => {
      let i = null, o = null;
      return { set(s, n) {
        switch (s) {
          case "sizes":
            if (i && i === n) return void (i = null);
            o = null;
            break;
          case "trimmed": {
            const l = n;
            o || (o = r.store.get("sizes")), i = (function(a, c) {
              const d = {}, h = Object.keys(a || {}).map(Number).sort(((p, v) => p - v)), u = h[h.length - 1];
              let g = 0;
              for (let p = 0; p <= u; p++) c[p] !== void 0 && (g++, a[p] !== void 0) || a[p] !== void 0 && (d[p - g] = a[p]);
              return d;
            })(o, l || {}), r.setSizes(i);
            break;
          }
        }
      } };
    })({ store: this.store, setSizes: this.setDimensionSize.bind(this) })), this.store.use(/* @__PURE__ */ ((r) => ({ set(i) {
      switch (i) {
        case "count":
        case "sizes":
        case "originItemSize":
          r.setStore({ realSize: Vc({ count: r.store.get("count"), sizes: r.store.get("sizes"), originItemSize: r.store.get("originItemSize") }) });
      }
    } }))({ store: this.store, setStore: this.setStore.bind(this) }));
  }
  getCurrentState() {
    const e = Kt();
    return de(Object.keys(e), ((r, i) => {
      const o = this.store.get(i);
      return r[i] = o, r;
    }), e);
  }
  dispose() {
    P(this.store, Kt());
  }
  setStore(e) {
    P(this.store, e);
  }
  drop() {
    P(this.store, Object.assign(Object.assign({}, { indexes: [], count: 0, trimmed: null, sizes: {}, positionIndexToItem: {}, indexToItem: {}, positionIndexes: [] }), { renderOffset: 0 }));
  }
  setDimensionSize(e = {}) {
    const r = Pa(this.store.get("originItemSize"), e);
    P(this.store, Object.assign(Object.assign({}, r), { sizes: e }));
  }
  updateSizesPositionByIndexes(e, r = []) {
    const i = Object.assign({}, this.store.get("sizes"));
    if (!Object.keys(i).length) return;
    const o = {};
    r.forEach(((n, l) => {
      o[n] || (o[n] = []), o[n].push(l);
    }));
    const s = {};
    e.forEach(((n, l) => {
      const a = o[n];
      if (a && a.length > 0) {
        const c = a.shift();
        c !== void 0 && c !== l && typeof i[c] == "number" && (s[l] = i[c], delete i[c]);
      }
    })), Object.keys(s).length && this.setDimensionSize(Object.assign(Object.assign({}, i), s));
  }
}
class Yt {
  constructor() {
    this.unsubscribe = [], this.store = jt({ range: null, tempRange: null, tempRangeType: null, focus: null, edit: null, lastCell: null, nextFocus: null }), this.store.on("set", ((e, r) => {
      e !== "tempRange" || r || this.store.set("tempRangeType", null);
    }));
  }
  onChange(e, r) {
    this.unsubscribe.push(this.store.onChange(e, r));
  }
  clearFocus() {
    P(this.store, { focus: null, range: null, edit: null, tempRange: null });
  }
  setFocus(e, r) {
    P(this.store, r ? { focus: e, range: Q(e, r), edit: null, tempRange: null } : { focus: e });
  }
  setNextFocus(e) {
    P(this.store, { nextFocus: e });
  }
  setTempArea(e) {
    P(this.store, { tempRange: e?.area, tempRangeType: e?.type, edit: null });
  }
  clearTemp() {
    P(this.store, { tempRange: null });
  }
  setRangeArea(e) {
    P(this.store, { range: e, edit: null, tempRange: null });
  }
  setRange(e, r) {
    const i = Q(e, r);
    this.setRangeArea(i);
  }
  setLastCell(e) {
    P(this.store, { lastCell: e });
  }
  setEdit(e) {
    const r = this.store.get("focus");
    P(this.store, r && typeof e == "string" ? { edit: { x: r.x, y: r.y, val: e } } : { edit: null });
  }
  dispose() {
    this.unsubscribe.forEach(((e) => e())), this.store.dispose();
  }
}
class re {
  constructor(e, r) {
    this.revogrid = e, this.providers = r, this.h = f, this.subscriptions = {};
  }
  addEventListener(e, r) {
    this.revogrid.addEventListener(e, r), this.subscriptions[e] = r;
  }
  watch(e, r, { immediate: i } = { immediate: !1 }) {
    var o;
    const s = Object.getOwnPropertyDescriptor(this.revogrid, e) || Object.getOwnPropertyDescriptor(this.revogrid.constructor.prototype, e);
    Object.defineProperty(this.revogrid, e, { configurable: !0, enumerable: (o = s?.enumerable) === null || o === void 0 || o, set(n) {
      var l;
      if (r(n) !== !1) return (l = s?.set) === null || l === void 0 ? void 0 : l.call(this, n);
    }, get() {
      var n;
      return (n = s?.get) === null || n === void 0 ? void 0 : n.call(this);
    } }), i && r(s?.get ? s.get.call(this.revogrid) : s?.value);
  }
  removeEventListener(e) {
    this.revogrid.removeEventListener(e, this.subscriptions[e]), delete this.subscriptions[e];
  }
  emit(e, r) {
    const i = new CustomEvent(e, { detail: r, cancelable: !0 });
    return this.revogrid.dispatchEvent(i), i;
  }
  clearSubscriptions() {
    for (let e in this.subscriptions) this.removeEventListener(e);
  }
  destroy() {
    this.clearSubscriptions();
  }
}
function Yc(t, e) {
  for (var r = -1, i = t == null ? 0 : t.length; ++r < i && e(t[r], r, t) !== !1; ) ;
  return t;
}
function X(t, e) {
  return (H(t) ? Yc : ts)(t, /* @__PURE__ */ (function(r) {
    return typeof r == "function" ? r : Hr;
  })(e));
}
var Tt;
(function(t) {
  t.headerClickAutosize = "headerClickAutoSize", t.autoSizeOnTextOverlap = "autoSizeOnTextOverlap", t.autoSizeAll = "autoSizeAll";
})(Tt || (Tt = {}));
class qc extends re {
  constructor(e, r, i) {
    super(e, r), this.providers = r, this.config = i, this.autoSizeColumns = null, this.dataResolve = null, this.dataReject = null, this.letterBlockSize = i?.letterBlockSize || 7, i?.preciseSize && (this.precsizeCalculationArea = this.initiatePresizeElement(), e.appendChild(this.precsizeCalculationArea));
    const o = ({ detail: { source: s } }) => {
      this.setSource(s);
    };
    switch (this.addEventListener("beforecolumnsset", (({ detail: { columns: s } }) => {
      this.columnSet(s);
    })), i?.mode) {
      case Tt.autoSizeOnTextOverlap:
        this.addEventListener("aftersourceset", o), this.addEventListener("afteredit", (({ detail: s }) => {
          this.afteredit(s);
        }));
        break;
      case Tt.autoSizeAll:
        this.addEventListener("aftersourceset", o), this.addEventListener("afteredit", (({ detail: s }) => {
          this.afterEditAll(s);
        }));
        break;
      default:
        this.addEventListener("headerdblclick", (({ detail: s }) => {
          const n = fr(s.column), l = this.getColumnSize(s.index, n);
          l && this.providers.dimension.setCustomSizes(n, { [s.index]: l }, !0);
        }));
    }
  }
  async setSource(e) {
    let r = this.autoSizeColumns;
    if (this.dataReject && (this.dataReject(), this.clearPromise()), !r) {
      const i = new Promise(((o, s) => {
        this.dataResolve = o, this.dataReject = s;
      }));
      try {
        r = await i;
      } catch {
        return;
      }
    }
    X(r, ((i, o) => {
      const s = {};
      X(r[o], ((n) => {
        n.size = s[n.index] = e.reduce(((l, a) => Math.max(l, this.getLength(a[n.prop]))), this.getLength(n.name || ""));
      })), this.providers.dimension.setCustomSizes(o, s, !0);
    }));
  }
  getLength(e) {
    var r;
    if (!e) return 0;
    try {
      const i = "" + e;
      return !((r = this.config) === null || r === void 0) && r.preciseSize ? (this.precsizeCalculationArea.innerText = i, this.precsizeCalculationArea.scrollWidth + 30) : i.length * this.letterBlockSize + 30;
    } catch {
      return 0;
    }
  }
  afteredit(e) {
    let r;
    r = this.isRangeEdit(e) ? e.data : { 0: { [e.prop]: e.val } }, X(this.autoSizeColumns, ((i, o) => {
      const s = {};
      X(i, ((n) => {
        var l;
        const a = de(r, ((c, d) => d[n.prop] === void 0 ? c : Math.max(c || 0, this.getLength(d[n.prop]))), void 0);
        a && ((l = n.size) !== null && l !== void 0 ? l : 0) < a && (n.size = s[n.index] = a);
      })), this.providers.dimension.setCustomSizes(o, s, !0);
    }));
  }
  afterEditAll(e) {
    const r = {};
    this.isRangeEdit(e) ? X(e.data, ((i) => X(i, ((o, s) => r[s] = !0)))) : r[e.prop] = !0, X(this.autoSizeColumns, ((i, o) => {
      const s = {};
      X(i, ((n) => {
        if (r[n.prop]) {
          const l = this.getColumnSize(n.index, o);
          l && (s[n.index] = l);
        }
      })), this.providers.dimension.setCustomSizes(o, s, !0);
    }));
  }
  getColumnSize(e, r) {
    var i, o;
    const s = (o = (i = this.autoSizeColumns) === null || i === void 0 ? void 0 : i[r]) === null || o === void 0 ? void 0 : o[e];
    return s ? de(this.providers.data.stores, ((n, l) => {
      const a = de(l.store.get("items"), ((c, d, h) => {
        const u = _(l.store, h);
        return Math.max(c || 0, this.getLength(u?.[s.prop]));
      }), 0);
      return Math.max(n, a);
    }), s.size || 0) : 0;
  }
  columnSet(e) {
    var r;
    for (let i of k) {
      const o = i, s = e[o];
      for (let n in s) (s[n].autoSize || !((r = this.config) === null || r === void 0) && r.allColumns) && (this.autoSizeColumns || (this.autoSizeColumns = {}), this.autoSizeColumns[o] || (this.autoSizeColumns[o] = {}), this.autoSizeColumns[o][n] = Object.assign(Object.assign({}, s[n]), { index: parseInt(n, 10) }));
    }
    this.dataResolve && (this.dataResolve(this.autoSizeColumns || {}), this.clearPromise());
  }
  clearPromise() {
    this.dataResolve = null, this.dataReject = null;
  }
  isRangeEdit(e) {
    return !!e.data;
  }
  initiatePresizeElement() {
    var e;
    const r = { position: "absolute", fontSize: "14px", height: "0", width: "0", whiteSpace: "nowrap", top: "0", overflowX: "scroll", display: "block" }, i = document.createElement("div");
    for (let o in r) i.style[o] = (e = r[o]) !== null && e !== void 0 ? e : "";
    return i.classList.add("revo-test-container"), i;
  }
  destroy() {
    var e;
    super.destroy(), (e = this.precsizeCalculationArea) === null || e === void 0 || e.remove();
  }
}
class io extends re {
  constructor(e, r) {
    super(e, r), this.providers = r, this.stretchedColumn = null, this.scrollSize = Ls(document), this.addEventListener("beforecolumnapplied", (({ detail: { columns: i } }) => this.applyStretch(i)));
  }
  setScroll({ type: e, hasScroll: r }) {
    var i;
    e === "rgRow" && this.stretchedColumn && ((i = this.stretchedColumn) === null || i === void 0 ? void 0 : i.initialSize) === this.stretchedColumn.size && r && (this.stretchedColumn.size -= this.scrollSize, this.apply(), this.dropChanges());
  }
  activateChanges() {
    this.addEventListener("scrollchange", (({ detail: e }) => this.setScroll(e)));
  }
  dropChanges() {
    this.stretchedColumn = null, this.removeEventListener("scrollchange");
  }
  apply() {
    if (!this.stretchedColumn) return;
    const e = "rgCol", r = this.providers.dimension.stores[e].store.get("sizes");
    this.providers.dimension.setCustomSizes(e, Object.assign(Object.assign({}, r), { [this.stretchedColumn.index]: this.stretchedColumn.size }), !0);
  }
  applyStretch(e) {
    this.dropChanges();
    let r = this.revogrid.clientWidth - 1;
    if (X(e, ((i, o) => {
      const s = this.providers.dimension.stores[o].store.get("realSize");
      r -= s;
    })), this.revogrid.rowHeaders) {
      const i = this.providers.data.stores.rgRow.store.get("source").length, o = this.revogrid.rowHeaders, s = Es(i, typeof o == "object" ? o : void 0);
      s && (r -= s);
    }
    if (r > 0) {
      const i = e.rgCol.length - 1, o = e.rgCol[i], s = o?.size || this.revogrid.colSize || 0, n = r + s - 1;
      o && !o.autoSize && s < n && (this.stretchedColumn = { initialSize: n, index: i, size: n }, this.apply(), this.activateChanges());
    }
  }
}
function Jc(t) {
  return !!t.applyStretch;
}
const Zc = { mime: "text/csv", fileKind: "csv", bom: !0, columnDelimiter: ",", rowDelimiter: `\r
`, encoding: "" }, Qc = RegExp('"', "g");
class ed {
  constructor(e = {}) {
    this.options = Object.assign(Object.assign({}, Zc), e);
  }
  doExport({ data: e, headers: r, props: i }) {
    let o = this.options.bom ? "\uFEFF" : "";
    return r?.length > 0 && r.forEach(((s) => {
      s.length && (o += this.prepareHeader(s, this.options.columnDelimiter), o += this.options.rowDelimiter);
    })), e.forEach(((s, n) => {
      n > 0 && (o += this.options.rowDelimiter), F(s) ? o += this.parseCell(xa(s), this.options.columnDelimiter) : o += i.map(((l) => this.parseCell(s[l], this.options.columnDelimiter))).join(this.options.columnDelimiter);
    })), o;
  }
  prepareHeader(e, r) {
    let i = "";
    return i += e.map(((o) => this.parseCell(o, r, !0))).join(r), i;
  }
  parseCell(e, r, i = !1) {
    let o = e;
    return typeof e != "string" && (o = JSON.stringify(e)), o === void 0 ? "" : o !== "" && (i || ["\r", '"', `
`, r].some(((s) => o.indexOf(s) >= 0))) ? `"${o.replace(Qc, '""')}"` : o;
  }
}
var Te;
(function(t) {
  t.csv = "csv";
})(Te || (Te = {}));
class td extends re {
  async exportString(e = {}, r = Te.csv) {
    const i = await this.beforeexport();
    return i ? this.formatter(r, e).doExport(i) : null;
  }
  async exportBlob(e = {}, r = Te.csv) {
    return await this.getBlob(this.formatter(r, e));
  }
  async exportFile(e = {}, r = Te.csv) {
    const i = this.formatter(r, e), o = window.URL || window.webkitURL, s = document.createElement("a"), { filename: n, fileKind: l } = i.options, a = `${n}.${l}`, c = await this.getBlob(i), d = c ? o.createObjectURL(c) : "";
    s.style.display = "none", s.setAttribute("href", d), s.setAttribute("download", a), this.revogrid.appendChild(s), s.dispatchEvent(new MouseEvent("click")), this.revogrid.removeChild(s), await Ae(120), o.revokeObjectURL(d);
  }
  async getBlob(e) {
    const r = `${e.options.mime};charset=${e.options.encoding}`;
    if (typeof Blob < "u") {
      const i = await this.beforeexport();
      return i ? new Blob([e.doExport(i)], { type: r }) : null;
    }
    return null;
  }
  async beforeexport() {
    let e = await this.getData();
    const r = this.emit("beforeexport", { data: e });
    return r.defaultPrevented ? null : r.detail.data;
  }
  async getData() {
    const e = await this.getSource(), r = [], i = [];
    k.forEach(((s, n) => {
      i.push(this.getColPerSource(s).then(((l) => r[n] = l)));
    })), await Promise.all(i);
    const o = { headers: [], props: [] };
    for (let s of r) s.headers.forEach(((n, l) => {
      o.headers[l] || (o.headers[l] = []), o.headers[l].push(...n);
    })), o.props.push(...s.props);
    return Object.assign({ data: e }, o);
  }
  async getColPerSource(e) {
    const r = await this.revogrid.getColumnStore(e), i = r.get("source"), o = r.get("items"), s = r.get("groupingDepth"), n = r.get("groups"), l = [], a = [];
    o.forEach(((d) => {
      const h = i[d].prop;
      l.push(i[d].name || ""), a.push(h);
    }));
    const c = this.getGroupHeaders(s, n, o);
    return c.push(l), { headers: c, props: a };
  }
  getGroupHeaders(e, r, i) {
    const o = [], s = (function(n) {
      return n != null && n.length ? (function(l, a, c, d) {
        var h = l.length;
        for ((c = qe(c)) < 0 && (c = -c > h ? 0 : h + c), (d = d === void 0 || d > h ? h : qe(d)) < 0 && (d += h), d = c > d ? 0 : (function(u) {
          return u ? (function(g, p, v) {
            return g == g && (g = (g = g <= v ? g : v) >= 0 ? g : 0), g;
          })(qe(u), 0, 4294967295) : 0;
        })(d); c < d; ) l[c++] = a;
        return l;
      })(n, "", void 0, void 0) : [];
    })(Array(i.length));
    for (let n = 0; n < e; n++) {
      const l = [...s];
      o.push(l), r[n] && r[n].forEach(((a) => {
        const c = a.indexes[0];
        typeof c == "number" && (l[c] = a.name);
      }));
    }
    return o;
  }
  async getSource() {
    const e = [], r = [];
    return G.forEach(((i) => {
      const o = [];
      e.push(o);
      const s = this.revogrid.getVisibleSource(i).then(((n) => o.push(...n)));
      r.push(s);
    })), await Promise.all(r), e.reduce(((i, o) => (i.push(...o), i)), []);
  }
  formatter(e, r = {}) {
    if (e === Te.csv) return new ed(r);
    throw Error("Unknown format");
  }
}
const He = (t, e) => {
  if (t === void 0 || t === null && !e) return !0;
  typeof t != "string" && (t = JSON.stringify(t));
  const r = e == null ? void 0 : ("" + e).toLocaleLowerCase();
  return r?.length === 0 || t.toLocaleLowerCase() === r;
}, $r = (t, e) => !He(t, e);
$r.extra = "input", He.extra = "input";
const Vr = function(t, e) {
  let r;
  return typeof t == "number" && e != null && (r = parseFloat(e == null ? void 0 : "" + e), t > r);
};
Vr.extra = "input";
const Gs = function(t, e) {
  return He(t, e) || Vr(t, e);
};
Gs.extra = "input";
const Kr = function(t, e) {
  let r;
  return typeof t == "number" && e != null && (r = parseFloat("" + e), t < r);
};
Kr.extra = "input";
const Xs = function(t, e) {
  return He(t, e) || Kr(t, e);
};
Xs.extra = "input";
const oo = (t) => !(t === "" || t == null), Vs = (t, e) => !(!t || e && (typeof t != "string" && (t = JSON.stringify(t)), typeof e != "string" && (e = JSON.stringify(e)), t.toLocaleLowerCase().indexOf(e.toLocaleLowerCase()) !== 0));
Vs.extra = "input";
const Yr = (t, e) => !e || !!t && (!e || (typeof t != "string" && (t = JSON.stringify(t)), t.toLocaleLowerCase().indexOf(("" + e).toLowerCase()) > -1)), Ks = (t, e) => !Yr(t, e);
Ks.extra = "input", Yr.extra = "input";
const rd = { none: () => !0, empty: (t) => !oo(t), notEmpty: oo, eq: He, notEq: $r, begins: Vs, contains: Yr, notContains: Ks, eqN: He, neqN: $r, gt: Vr, gte: Gs, lt: Kr, lte: Xs }, id = { string: ["notEmpty", "empty", "eq", "notEq", "begins", "contains", "notContains"], number: ["notEmpty", "empty", "eqN", "neqN", "gt", "gte", "lt", "lte"] }, od = { none: "None", empty: "Not set", notEmpty: "Set", eq: "Equal", notEq: "Not equal", begins: "Begins with", contains: "Contains", notContains: "Does not contain", eqN: "=", neqN: "!=", gt: ">", gte: ">=", lt: "<", lte: "<=" }, Rr = "filter", sd = "filterconfigchanged", nd = "revogr-filter-panel";
class ld extends re {
  constructor(e, r, i) {
    var o;
    super(e, r), this.revogrid = e, this.config = i, this.filterCollection = {}, this.multiFilterItems = {}, this.filterByType = Object.assign({}, id), this.filterNameIndexByType = Object.assign({}, od), this.filterFunctionsIndexedByType = Object.assign({}, rd), this.filterProp = Cs, i && this.initConfig(i);
    const s = this.revogrid.registerVNode.filter(((l) => typeof l == "object" && l.t !== nd));
    this.revogrid.registerVNode = [...s, f("revogr-filter-panel", { filterNames: this.filterNameIndexByType, filterEntities: this.filterFunctionsIndexedByType, filterCaptions: (o = i?.localization) === null || o === void 0 ? void 0 : o.captions, onFilterChange: (l) => this.onFilterChange(l.detail), onResetChange: (l) => this.onFilterReset(l.detail), disableDynamicFiltering: i?.disableDynamicFiltering, closeOnOutsideClick: i?.closeFilterPanelOnOutsideClick, ref: (l) => this.pop = l }, " ", this.extraContent())];
    const n = async () => {
      const l = Object.keys(this.filterCollection);
      l.length > 0 && l.forEach(((a, c) => {
        this.multiFilterItems[a] || (this.multiFilterItems[a] = [{ id: c, type: this.filterCollection[a].type, value: this.filterCollection[a].value, relation: "and" }]);
      })), Object.keys(this.multiFilterItems).length !== 0 && (await Ae(), await this.runFiltering(this.multiFilterItems));
    };
    this.addEventListener("headerclick", ((l) => this.headerclick(l))), this.addEventListener(sd, (({ detail: l }) => {
      l && (typeof l != "object" || l.multiFilterItems && Object.keys(l.multiFilterItems).length) ? (typeof l == "object" && this.initConfig(l), n()) : this.clearFiltering();
    })), this.addEventListener("aftersourceset", n), this.addEventListener("filter", (({ detail: l }) => this.onFilterChange(l)));
  }
  beforeshow(e) {
  }
  extraContent() {
    return null;
  }
  initConfig(e) {
    if (this.multiFilterItems = e.multiFilterItems ? Object.assign({}, e.multiFilterItems) : {}, e.customFilters) for (let i in e.customFilters) {
      const o = e.customFilters[i];
      this.filterByType[o.columnFilterType] || (this.filterByType[o.columnFilterType] = []), this.filterByType[o.columnFilterType].push(i), this.filterFunctionsIndexedByType[i] = o.func, this.filterNameIndexByType[i] = o.name;
    }
    e.filterProp && (this.filterProp = e.filterProp);
    const r = e.include;
    if (r) {
      const i = {};
      for (let o in this.filterByType) {
        const s = this.filterByType[o].filter(((n) => r.indexOf(n) > -1));
        s.length && (i[o] = s);
      }
      Object.keys(i).length > 0 && (this.filterByType = i);
    }
    if (e.collection) {
      const i = {};
      for (const o of Object.keys(e.collection)) {
        const s = e.collection[o];
        this.filterFunctionsIndexedByType[s.type] && (i[o] = s);
      }
      this.filterCollection = i;
    } else this.filterCollection = {};
    if (e.localization && e.localization.filterNames) {
      const i = e.localization.filterNames;
      Object.keys(i).forEach(((o) => {
        this.filterNameIndexByType[o] != null && (this.filterNameIndexByType[o] = i[o]);
      }));
    }
  }
  async headerclick(e) {
    var r, i;
    const o = (r = e.detail.originalEvent) === null || r === void 0 ? void 0 : r.target, s = $s(o);
    if (!s || (e.preventDefault(), !this.pop)) return;
    const n = e.detail.prop, l = await this.pop.getChanges();
    if (l?.prop === n) return void await this.pop.show();
    const a = (s instanceof HTMLElement ? s : o).getBoundingClientRect(), c = Object.assign(Object.assign(Object.assign({}, e.detail), this.filterCollection[n]), { x: a.x, y: a.y + a.height, anchorY: a.y, autoCorrect: !0, filterTypes: this.getColumnFilter(e.detail.filter), filterItems: this.multiFilterItems, extraContent: this.extraHyperContent, extraBottomContent: this.extraBottomHyperContent });
    (i = this.beforeshow) === null || i === void 0 || i.call(this, c), this.pop.show(c);
  }
  getColumnFilter(e) {
    let r = "string";
    if (!e) return { [r]: this.filterByType[r] };
    if (this.isValidType(e)) r = e;
    else if (typeof e == "object" && e.length) return e.reduce(((i, o) => (this.isValidType(o) && (i[o] = this.filterByType[o]), i)), {});
    return { [r]: this.filterByType[r] };
  }
  isValidType(e) {
    return !(typeof e != "string" || !this.filterByType[e]);
  }
  async onFilterChange(e) {
    this.multiFilterItems = e, this.runFiltering(this.multiFilterItems);
  }
  onFilterReset(e) {
    delete this.multiFilterItems[e ?? ""], this.onFilterChange(this.multiFilterItems);
  }
  async doFiltering(e, r, i, o) {
    const s = [], n = {};
    i.forEach(((d) => {
      const h = Object.assign({}, d), u = o[h.prop];
      n[h.prop] = h, h[this.filterProp] && !u && (delete h[this.filterProp], s.push(h)), !h[this.filterProp] && u && (s.push(h), h[this.filterProp] = !0);
    }));
    const l = this.getRowFilter(r, o, n), { defaultPrevented: a, detail: c } = this.emit("beforefiltertrimmed", { collection: e, itemsToFilter: l, source: r, filterItems: o });
    a || (this.providers.data.setTrimmed({ [Rr]: c.itemsToFilter }), this.providers.column.updateColumns(s), this.emit("afterfilterapply", { multiFilterItems: o, source: r, collection: e }));
  }
  async clearFiltering() {
    this.multiFilterItems = {}, await this.runFiltering(this.multiFilterItems);
  }
  async runFiltering(e) {
    const r = {}, i = Object.keys(e);
    for (const a of i) if (e[a].length > 0) {
      const c = e[a][0];
      r[a] = { type: c.type, value: c.value };
    }
    this.filterCollection = r;
    const o = this.providers.column.getColumns(), s = this.providers.data.stores.rgRow.store.get("source"), { defaultPrevented: n, detail: l } = this.emit("beforefilterapply", { collection: this.filterCollection, source: s, columns: o, filterItems: this.multiFilterItems });
    n || this.doFiltering(l.collection, l.source, l.columns, l.filterItems);
  }
  getRowFilter(e, r, i) {
    const o = Object.keys(r), s = {};
    for (let n = 0; n < e.length; n++) for (const l of o) this.shouldTrimRow(r[l], l, i[l], e[n]) && (s[n] = !0);
    return s;
  }
  shouldTrimRow(e, r, i, o = {}) {
    let s = 0, n = [];
    for (const [l, a] of e.entries()) {
      const c = this.filterFunctionsIndexedByType[a.type], d = i ? rs(o, i) : o[r];
      if (a.relation === "or") {
        if (n = [], c(d, a.value)) continue;
        s++;
      } else if (n.push(!c(d, a.value)), ad(l, e)) {
        if (cd(n)) {
          n = [];
          continue;
        }
        s += n.length, n = [];
      }
    }
    return s === e.length;
  }
}
function ad(t, e) {
  const r = e[t + 1];
  return !r || !!r.relation && r.relation !== "and";
}
function cd(t) {
  return !t.includes(!0);
}
function ut(t) {
  for (const e of Object.keys(t || {})) if (t?.[e]) return !0;
  return !1;
}
function ke(t, e) {
  return t + "" == e + "";
}
function dd(t, e, r) {
  const i = (function(s, n) {
    const l = [], a = (c) => {
      s?.[c] && !l.some(((d) => ke(d, c))) && l.push(c);
    };
    return n?.forEach(a), Object.keys(s || {}).forEach(a), l;
  })(t, r);
  if (i.length <= 1) return;
  const o = i.findIndex(((s) => ke(s, e)));
  return o >= 0 ? o + 1 : void 0;
}
function hd(t, e, r) {
  const i = r ? et(t, r) : t?.[e];
  return typeof i == "number" ? i : i == null ? void 0 : ("" + i).toLowerCase();
}
function so(t) {
  return t === "" || t == null;
}
function Ys(t, e) {
  if (t === e) return 0;
  const r = so(t), i = so(e);
  return r || i ? r && i ? 0 : r ? -1 : 1 : t > e ? 1 : -1;
}
function ud(t, e, r = {}, i, o, s) {
  const n = Object.keys(r).length > 0, l = (function(a = {}, c) {
    const d = [], h = (u) => {
      const g = a[u];
      typeof g != "function" || d.some((([p]) => ke(p, u))) || d.push([u, g]);
    };
    return c?.forEach(h), Object.keys(a).forEach(h), d;
  })(r, s);
  return l.length === 0 ? n ? t : [...Array(t.length).keys()] : (function(a, c, d) {
    return c.some(((h) => {
      const u = d[h];
      return F(u) && !a.some((([g]) => ke(u[mt], g)));
    }));
  })(l, t, e) ? t : (function(a, c, d, h, u) {
    return !c.some(((g) => F(d[g]))) && !!h && !!u && a.every((([g]) => {
      const p = u[g];
      return !!h[g] && !p?.cellCompare;
    }));
  })(l, t, e, i, o) ? (function(a, c, d, h, u) {
    const g = d.map((([p]) => {
      const v = [], y = u[p];
      for (const w of a) v[w] = hd(c[w], p, y);
      return { order: h[p], values: v };
    }));
    return a.sort(((p, v) => {
      for (const { order: y, values: w } of g) {
        const x = Ys(w[p], w[v]);
        if (x) return y === "desc" ? -x : x;
      }
      return 0;
    }));
  })(t, e, l, i, o) : t.sort(((a, c) => {
    const d = e[a], h = e[c];
    for (const [u, g] of l) {
      if (F(d) && !ke(d[mt], u) || F(h) && !ke(h[mt], u)) return a - c;
      const p = g?.(u, d, h);
      if (p) return p;
    }
    return 0;
  }));
}
function no(t, e, r) {
  const i = this.column ? et(e, this.column) : e?.[t], o = this.column ? et(r, this.column) : r?.[t];
  return Ys(typeof i == "number" ? i : i == null ? void 0 : ("" + i).toLowerCase(), typeof o == "number" ? o : o == null ? void 0 : ("" + o).toLowerCase());
}
function gd(t) {
  return (e, r, i) => -1 * t(e, r, i);
}
function pd(t) {
  switch (t) {
    case void 0:
      return "asc";
    case "asc":
      return "desc";
    case "desc":
      return;
  }
}
function qt(t, e) {
  var r;
  const i = ((r = t?.cellCompare) === null || r === void 0 ? void 0 : r.bind({ order: e })) || no?.bind({ column: t, order: e });
  return e == "asc" ? i : e == "desc" ? gd(i) : void 0;
}
class qs extends re {
  constructor(e, r, i) {
    super(e, r), this.revogrid = e, this.sortingPromise = null, this.postponeSort = Ce(((o, s, n, l, a) => this.runSorting(o, s, n, l, a)), 50), this.applySortingConfig(i), this.addEventListener("sortingconfigchanged", (({ detail: o }) => {
      i = o, this.applySortingConfig(o), this.startSorting(this.sorting, this.sortingFunc, this.sortingColumns, this.sortingOrder);
    })), this.addEventListener("beforeheaderrender", (({ detail: o }) => {
      var s;
      const { data: n } = o;
      n.sortable && (o.data = Object.assign(Object.assign({}, n), { order: (s = this.sorting) === null || s === void 0 ? void 0 : s[n.prop], sortIndex: dd(this.sorting, n.prop, this.sortingOrder) }));
    })), this.addEventListener("beforeanysource", (({ detail: { type: o } }) => {
      if (ut(this.sorting) && this.sortingFunc) {
        if (this.emit("beforesourcesortingapply", { type: o, sorting: this.sorting }).defaultPrevented) return;
        this.startSorting(this.sorting, this.sortingFunc, this.sortingColumns, this.sortingOrder);
      }
    })), this.addEventListener("aftercolumnsset", (({ detail: { order: o } }) => {
      if (i) return;
      const s = this.providers.column.getColumns(), n = {}, l = {}, a = [], c = {};
      for (let d in o) if (o[d]) {
        const h = vr(s, d), u = qt(h, o[d]);
        c[d] = o[d], n[d] = u, l[d] = h, a.push(d);
      }
      this.sorting = ut(c) ? c : void 0, this.sortingFunc = this.sorting ? n : void 0, this.sortingColumns = this.sorting ? l : void 0, this.sortingOrder = this.sorting ? a : void 0;
    })), this.addEventListener("beforeheaderclick", ((o) => {
      var s, n, l, a;
      o.defaultPrevented || !((n = (s = o.detail) === null || s === void 0 ? void 0 : s.column) === null || n === void 0) && n.sortable && this.headerclick(o.detail.column, (a = (l = o.detail) === null || l === void 0 ? void 0 : l.originalEvent) === null || a === void 0 ? void 0 : a.shiftKey);
    }));
  }
  createSortingState(e) {
    var r;
    return { sorting: e ? Object.assign({}, this.sorting) : {}, sortingFunc: e ? Object.assign({}, this.sortingFunc) : {}, sortingColumns: e ? Object.assign({}, this.sortingColumns) : {}, sortingOrder: e ? [...(r = this.sortingOrder) !== null && r !== void 0 ? r : []] : [] };
  }
  setSortingState({ sorting: e, sortingFunc: r, sortingColumns: i, sortingOrder: o }) {
    this.sorting = ut(e) ? e : void 0, this.sortingFunc = this.sorting ? r : void 0, this.sortingColumns = this.sorting ? i : void 0, this.sortingOrder = this.sorting ? o : void 0;
  }
  setColumnSorting(e, r, i, o, s) {
    e.sorting[r] = i, e.sortingFunc[r] = o, e.sortingColumns[r] = s, e.sortingOrder.some(((n) => n + "" == r + "")) || e.sortingOrder.push(r);
  }
  clearColumnSorting(e, r) {
    delete e.sorting[r], delete e.sortingFunc[r], delete e.sortingColumns[r];
    const i = e.sortingOrder.findIndex(((o) => o + "" == r + ""));
    i >= 0 && e.sortingOrder.splice(i, 1);
  }
  applySortingConfig(e) {
    var r;
    if (!e) return;
    const i = this.createSortingState(e.additive);
    (r = e.columns) === null || r === void 0 || r.forEach(((o) => {
      o.order ? this.setColumnSorting(i, o.prop, o.order, qt(o, o.order), o) : this.clearColumnSorting(i, o.prop);
    })), this.setSortingState(i);
  }
  resetSortingForStore(e) {
    const r = this.providers.data.stores[e], i = r.store.get("source"), o = r.store.get("proxyItems"), s = Array.from({ length: i.length }, ((n, l) => l));
    this.providers.dimension.updateSizesPositionByNewDataIndexes(e, s, o), r.setData({ proxyItems: s });
  }
  applySortingForStore(e, r, i, o, s, n) {
    const l = this.providers.data.stores[e], a = l.store.get("source"), c = l.store.get("proxyItems"), d = (function(p, v) {
      return p.filter(((y) => !F(v[y])));
    })(c, a), h = (function(p, v, y) {
      if (y.length === p.length) return y;
      let w = 0;
      return p.map(((x) => F(v[x]) ? x : y[w++]));
    })(c, a, ud([...d], a, i, r, o, s)), u = l.store.get("items");
    l.setData({ proxyItems: h });
    const g = l.store.get("items");
    n || this.providers.dimension.updateSizesPositionByNewDataIndexes(e, g, u);
  }
  startSorting(e, r, i, o, s) {
    this.sortingPromise || this.revogrid.jobsBeforeRender.push(new Promise(((n) => {
      this.sortingPromise = n;
    }))), typeof i != "boolean" ? this.postponeSort(e, r, i, o, s) : this.postponeSort(e, r, void 0, void 0, i);
  }
  headerclick(e, r) {
    var i;
    let o = pd((i = this.sorting) === null || i === void 0 ? void 0 : i[e.prop]);
    const s = this.emit("beforesorting", { column: e, order: o, additive: r });
    if (s.defaultPrevented) return;
    o = s.detail.order;
    const n = this.emit("beforesortingapply", { column: s.detail.column, order: o, additive: r });
    if (n.defaultPrevented) return;
    const l = qt(n.detail.column, n.detail.order);
    this.applyHeaderSorting(n.detail.column, n.detail.additive, o, l), this.startSorting(this.sorting, this.sortingFunc, this.sortingColumns, this.sortingOrder);
  }
  applyHeaderSorting(e, r, i, o) {
    if (!r) return void this.setSortingState(i ? { sorting: { [e.prop]: i }, sortingFunc: { [e.prop]: o }, sortingColumns: { [e.prop]: e }, sortingOrder: [e.prop] } : this.createSortingState());
    const s = this.createSortingState(!0);
    i ? this.setColumnSorting(s, e.prop, i, o, e) : this.clearColumnSorting(s, e.prop), this.setSortingState(s);
  }
  runSorting(e, r, i, o, s) {
    var n, l;
    if (typeof i == "boolean") return this.sort(e, r, void 0, void 0, void 0, i), (n = this.sortingPromise) === null || n === void 0 || n.call(this), void (this.sortingPromise = null);
    this.sort(e, r, i, o, void 0, s), (l = this.sortingPromise) === null || l === void 0 || l.call(this), this.sortingPromise = null;
  }
  sort(e, r, i, o, s = G, n = !1) {
    let l, a, c = s, d = n;
    if (Array.isArray(i) ? (c = i, d = typeof o == "boolean" && o) : (l = i, a = Array.isArray(o) ? o : void 0), Object.keys(e || {}).length) for (let u of c) this.applySortingForStore(u, e, r, l, a, d);
    else for (let u of c) this.resetSortingForStore(u);
    k.forEach(((u) => {
      this.providers.column.dataSources[u].refresh();
    }));
    const h = { sorting: ut(e) ? e : void 0, sortingColumns: l, sortingOrder: a, types: c };
    this.emit("aftersortingapply", h);
  }
}
function fd(t, e) {
  const r = e[t], i = r[zt], o = {};
  let s = t + 1;
  const n = e.length;
  for (; s < n; ) {
    const l = e[s];
    if (F(l)) {
      const a = l[zt];
      if (!a.length || !a.startsWith(i + ",")) break;
      l[_e] = !1;
    }
    o[s++] = !0;
  }
  return r[_e] = !1, { trimmed: o };
}
function vd(t, e, r) {
  const i = r[t], o = e[i], s = hs(o[Br]), n = {};
  if (!s) return { trimmed: n };
  const l = [];
  o[_e] = !0;
  let a = i + 1;
  const c = e.length;
  let d = 0;
  for (; a < c; ) {
    const u = e[a], g = F(u);
    if (g) {
      if (!$a(s, o, u)) break;
      d || (d = u[Se]);
    }
    (!d || g && d === u[Se]) && (n[a] = !1, l.push(a)), a++;
  }
  const h = { trimmed: n };
  if (l.length) {
    const u = [...r];
    u.splice(t + 1, 0, ...l), h.items = u;
  }
  return h;
}
const gt = "grouping";
function md(t, e, r) {
  const i = Number.parseInt(t, 10), o = e[i];
  return r ? r[typeof o == "number" ? o : i] : o;
}
function Jt(t, e) {
  const r = Object.assign({}, e);
  return t.forEach(((i, o) => {
    F(i) && ((function(s, n, l) {
      var a;
      const c = (a = s[l]) === null || a === void 0 ? void 0 : a[Se];
      if (c == null) return !1;
      for (let d = l + 1; d < s.length; d++) {
        const h = s[d];
        if (F(h)) {
          if (h[Se] <= c) break;
        } else if (!n[d]) return !0;
      }
      return !1;
    })(t, r, o) ? delete r[o] : r[o] = !0);
  })), r;
}
class lo extends re {
  getStore(e = Xt) {
    return this.providers.data.stores[e].store;
  }
  constructor(e, r) {
    super(e, r);
  }
  onFocus(e) {
    F(e.detail.model) && e.preventDefault();
  }
  onExpand({ virtualIndex: e }) {
    const { source: r } = Oe(this.getStore().get("source"), this.getStore().get("proxyItems"));
    let i = this.getStore().get("trimmed")[gt], o = Ql(this.getStore(), e);
    if (as(r[o])) {
      const { trimmed: s } = fd(o, r);
      i = Object.assign(Object.assign({}, i), s), this.revogrid.clearFocus();
    } else {
      const { trimmed: s, items: n } = vd(e, r, this.getStore().get("items"));
      i = Object.assign(Object.assign({}, i), s), n && ra(this.getStore(), n);
    }
    this.getStore().set("source", r), this.revogrid.addTrimmed(i, gt);
  }
  setColumnGrouping(e) {
    return !!e?.length && (e[0][mr] = !0, !0);
  }
  setColumns({ columns: e }) {
    for (let r of k) if (this.setColumnGrouping(e[r])) break;
  }
  onDrag(e) {
    const { from: r, to: i } = e.detail, o = i - r >= 0, { source: s } = Oe(this.getStore().get("source"), this.getStore().get("proxyItems")), n = this.getStore().get("items");
    let l = o ? r : i;
    const a = o ? i : r;
    for (; l < a; l++) if (F(s[n[l]])) return void e.preventDefault();
  }
  beforeTrimmedApply(e, r) {
    if (r === Rr) {
      const i = Jt(this.getStore().get("source"), e);
      Object.keys(e).forEach(((o) => delete e[Number.parseInt(o, 10)])), Object.assign(e, i);
    }
  }
  beforeFilterTrimmed(e) {
    return Jt(this.getStore().get("source"), e);
  }
  isSortingRunning() {
    const e = this.providers.plugins.getByClass(qs);
    return !!e?.sortingPromise;
  }
  getCurrentExpandedOptions() {
    var e;
    return (function(r, i) {
      var o = {};
      for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && i.indexOf(s) < 0 && (o[s] = r[s]);
      if (r != null && typeof Object.getOwnPropertySymbols == "function") {
        var n = 0;
        for (s = Object.getOwnPropertySymbols(r); n < s.length; n++) i.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, s[n]) && (o[s[n]] = r[s[n]]);
      }
      return o;
    })((e = this.options) !== null && e !== void 0 ? e : {}, ["expandedAll", "prevExpanded"]);
  }
  doSourceUpdate(e) {
    var r;
    const i = this.getStore(), { source: o, prevExpanded: s, oldNewIndexes: n } = Oe(i.get("source"), i.get("proxyItems"), !0), l = Object.assign({ prevExpanded: s }, e), { sourceWithGroups: a, depth: c, trimmed: d, oldNewIndexMap: h } = Yi(o, ((r = this.options) === null || r === void 0 ? void 0 : r.props) || [], l);
    this.providers.data.setData(a, Xt, this.revogrid.disableVirtualY, { depth: c, customRenderer: e?.groupLabelTemplate }, !0), this.updateTrimmed(d, n ?? {}, h, a);
  }
  onDataSet(e) {
    var r, i;
    let o = {};
    if (((r = this.options) === null || r === void 0 ? void 0 : r.preserveGroupingOnUpdate) !== !1) {
      let { prevExpanded: h } = Oe(this.getStore().get("source"), this.getStore().get("proxyItems"), !0);
      o = h;
    }
    const s = e.source.filter(((h) => !F(h))), n = Object.assign(Object.assign({}, this.revogrid.grouping || {}), { prevExpanded: o }), { sourceWithGroups: l, depth: a, trimmed: c, oldNewIndexMap: d } = Yi(s, ((i = this.options) === null || i === void 0 ? void 0 : i.props) || [], n);
    e.source = l, this.providers.data.setGrouping({ depth: a }), this.updateTrimmed(c, d, void 0, l);
  }
  setGrouping(e) {
    var r, i;
    if (this.clearSubscriptions(), this.options = e, !(!((i = (r = this.options) === null || r === void 0 ? void 0 : r.props) === null || i === void 0) && i.length)) return void this.clearGrouping();
    const o = this.getStore(), { source: s } = Oe(o.get("source"), o.get("proxyItems"));
    s.length && this.doSourceUpdate(Object.assign({}, e));
    for (let n of k) if (this.setColumnGrouping(this.providers.column.getColumns(n))) {
      this.providers.column.refreshByType(n);
      break;
    }
    this.addEventListener("beforesourceset", (({ detail: n }) => {
      var l, a, c;
      !((a = (l = this.options) === null || l === void 0 ? void 0 : l.props) === null || a === void 0) && a.length && (!((c = n?.source) === null || c === void 0) && c.length) && (this.isSortingRunning() || this.onDataSet(n));
    })), this.addEventListener("beforecolumnsset", (({ detail: n }) => {
      this.setColumns(n);
    })), this.addEventListener("beforetrimmed", (({ detail: { trimmed: n, trimmedType: l } }) => this.beforeTrimmedApply(n, l))), this.addEventListener("beforefiltertrimmed", (({ detail: n }) => {
      n.itemsToFilter = this.beforeFilterTrimmed(n.itemsToFilter);
    })), this.addEventListener("aftersortingapply", (() => {
      var n, l;
      !((l = (n = this.options) === null || n === void 0 ? void 0 : n.props) === null || l === void 0) && l.length && this.doSourceUpdate(this.getCurrentExpandedOptions());
    })), this.addEventListener("beforecellfocus", ((n) => this.onFocus(n))), this.addEventListener("roworderchanged", ((n) => this.onDrag(n))), this.addEventListener(ns, ((n) => this.onExpand(n.detail)));
  }
  clearGrouping() {
    k.forEach(((i) => {
      const o = this.providers.column.getColumns(i);
      let s = !1;
      o.forEach(((n) => {
        ds(n) && (delete n[mr], s = !0);
      })), s && this.providers.column.refreshByType(i);
    }));
    const { source: e, oldNewIndexes: r } = Oe(this.getStore().get("source"), this.getStore().get("proxyItems"), !0);
    this.providers.data.setData(e, Xt, this.revogrid.disableVirtualY, void 0, !0), this.updateTrimmed(void 0, void 0, r, e);
  }
  updateTrimmed(e = {}, r = {}, i, o = this.getStore().get("source")) {
    const s = (function(n, l, a) {
      const c = {};
      for (let d in n) {
        if (d === gt) continue;
        const h = n[d], u = {};
        for (let g in h) {
          if (!h[g]) continue;
          const p = md(g, l, a);
          typeof p == "number" && (u[p] = !0);
        }
        c[d] = u;
      }
      return c;
    })(this.getStore().get("trimmed"), r, i);
    for (let n in s) n === Rr && (s[n] = Jt(o, s[n])), this.revogrid.addTrimmed(s[n], n);
    this.revogrid.addTrimmed(Object.assign({}, e), gt);
  }
}
const ao = "column-drag-start";
class yd {
  constructor() {
    this.offset = 0;
  }
  renderAutoscroll(e, r) {
    r && (this.autoscrollEl = document.createElement("div"), this.autoscrollEl.classList.add("drag-auto-scroll-y"), r.appendChild(this.autoscrollEl));
  }
  autoscroll(e, r, i = "translateX") {
    this.autoscrollEl && (this.autoscrollEl.style.transform = `${i}(${Math.min(e + 10, r - 3)}px)`, this.autoscrollEl.scrollIntoView({ block: "nearest", inline: "nearest" }));
  }
  start(e, { dataEl: r, gridRect: i, scrollEl: o, gridEl: s }, n = "left") {
    s.classList.add(ao);
    const l = o.getBoundingClientRect();
    l && (this.offset = l[n] - i[n]), this.renderAutoscroll(e, r);
  }
  stop(e) {
    var r;
    e.classList.remove(ao), this.element && (this.element.hidden = !0), this.offset = 0, (r = this.autoscrollEl) === null || r === void 0 || r.remove(), this.autoscrollEl = void 0;
  }
  showHandler(e, r, i = "translateX") {
    this.element && (this.offset && (e = Math.max(e, this.offset)), this.element.style.transform = `${i}(${e = Math.min(e, r)}px)`, this.element.hidden = !1);
  }
  render() {
    const e = this.element = document.createElement("div");
    return e.classList.add("drag-position-y"), e.hidden = !0, e;
  }
}
const bd = Rs, Sd = "columndragmousemove", wd = "columndragend", xd = "beforecolumndragend", Cd = "columndragstart";
class $d extends re {
  constructor(e, r) {
    super(e, r), this.moveFunc = Ce(((i) => this.doMove(i)), 5), this.preventHeaderClickAfterDrag = (i) => {
      this.preventNextHeaderClick && (this.preventNextHeaderClick = !1, i.preventDefault());
    }, this.staticDragData = null, this.dragData = null, this.columnDragMoved = !1, this.preventNextHeaderClick = !1, this.localSubscriptions = {}, this.orderUi = new yd(), e.appendChild(this.orderUi.render()), e.classList.add("column-draggable"), this.localSubscriptions.mouseleave = { target: document, callback: (i) => this.onMouseOut(i) }, this.localSubscriptions.mouseup = { target: document, callback: (i) => this.onMouseUp(i) }, this.localSubscriptions.mousemove = { target: document, callback: (i) => this.move(i) }, this.addEventListener(bd, (({ detail: i }) => this.dragStart(i))), this.revogrid.addEventListener("beforeheaderclick", this.preventHeaderClickAfterDrag, { capture: !0 });
  }
  dragStart({ event: e, data: r }) {
    if (e.defaultPrevented) return;
    this.preventNextHeaderClick = !1;
    const { defaultPrevented: i } = Ke(this.revogrid, Cd, r);
    if (i) return;
    this.clearOrder();
    const { mouseleave: o, mouseup: s, mousemove: n } = this.localSubscriptions;
    o.target.addEventListener("mouseleave", o.callback), s.target.addEventListener("mouseup", s.callback);
    const l = e.target.closest("revogr-header"), a = e.target.closest("revogr-viewport-scroll");
    if (!l || !a || Nr(r) || r.providers.type === "rowHeaders") return;
    const c = this.getDimension(r.pin || "rgCol"), d = this.revogrid.getBoundingClientRect(), h = l.getBoundingClientRect(), u = ee(c, Zt(e.x, d.left, h.left - d.left) + (c.renderOffset || 0));
    this.staticDragData = { startPos: e.x, startItem: u, pin: r.pin, dataEl: l, scrollEl: a, gridEl: this.revogrid, cols: c }, this.dragData = this.getData(this.staticDragData, []), n.target.addEventListener("mousemove", n.callback), this.orderUi.start(e, Object.assign(Object.assign({}, this.dragData), this.staticDragData));
  }
  doMove(e) {
    if (!this.staticDragData) return;
    const r = this.dragData = this.getData(this.staticDragData, []);
    if (r && Math.abs(this.staticDragData.startPos - e.x) > 10) {
      const i = Zt(e.x, this.dragData.gridRect.left, this.dragData.scrollOffset), o = ee(this.staticDragData.cols, i + (this.staticDragData.cols.renderOffset || 0));
      if (this.orderUi.autoscroll(i, r.elRect.width), o.itemIndex >= this.staticDragData.cols.count) return;
      this.orderUi.showHandler(Rd(o, this.staticDragData.startItem, this.staticDragData.cols.renderOffset || 0, r.scrollOffset), r.gridRect.width);
    }
  }
  move(e) {
    this.staticDragData && Math.abs(this.staticDragData.startPos - e.x) > 10 && (this.columnDragMoved = !0), Ke(this.revogrid, Sd, e), this.moveFunc(e);
  }
  onMouseOut(e) {
    this.clearOrder();
  }
  onMouseUp(e) {
    const r = this.columnDragMoved;
    if (this.dragData && this.staticDragData) {
      let i = Zt(e.x, this.dragData.gridRect.left, this.dragData.scrollOffset);
      i < 0 && (i = 0);
      const o = ee(this.staticDragData.cols, i + (this.staticDragData.cols.renderOffset || 0)), s = this.providers.column.stores[this.dragData.type].store, n = s.get("source"), l = [...s.get("items")], { defaultPrevented: a } = Ke(this.revogrid, xd, Object.assign(Object.assign({}, this.staticDragData), { startPosition: this.staticDragData.startItem, newPosition: o, newItem: n[l[this.staticDragData.startItem.itemIndex]] }));
      if (!a) {
        const c = [...l], d = l.splice(this.staticDragData.startItem.itemIndex, 1);
        l.splice(o.itemIndex, 0, ...d), s.set("items", l), this.providers.dimension.updateSizesPositionByNewDataIndexes(this.dragData.type, l, c);
      }
      Ke(this.revogrid, wd, this.getData(this.staticDragData, l, n));
    }
    r && (this.preventNextHeaderClick = !!e.target.closest("revogr-header")), this.clearOrder();
  }
  clearLocalSubscriptions() {
    X(this.localSubscriptions, (({ target: e, callback: r }, i) => e.removeEventListener(i, r)));
  }
  clearOrder() {
    this.staticDragData = null, this.dragData = null, this.columnDragMoved = !1, this.clearLocalSubscriptions(), this.orderUi.stop(this.revogrid);
  }
  clearSubscriptions() {
    super.clearSubscriptions(), this.clearLocalSubscriptions(), this.revogrid.removeEventListener("beforeheaderclick", this.preventHeaderClickAfterDrag, { capture: !0 });
  }
  getData({ gridEl: e, dataEl: r, pin: i }, o, s = []) {
    const n = e.getBoundingClientRect(), l = r.getBoundingClientRect(), a = l.left - n.left;
    return { columns: o.map(((c) => s[c])).filter(Boolean), elRect: l, gridRect: n, order: o, type: i || "rgCol", scrollOffset: a };
  }
  getDimension(e) {
    return this.providers.dimension.stores[e].getCurrentState();
  }
}
function Zt(t, e, r) {
  return t - e - r;
}
function Rd(t, e, r, i) {
  return (e.itemIndex > t.itemIndex ? t.start : t.end) - r + i;
}
class Od {
  get stores() {
    return this.dataSources;
  }
  constructor() {
    this.collection = null, this.dataSources = k.reduce(((e, r) => (e[r] = new Rt(r), e)), {});
  }
  column(e, r = "rgCol") {
    return this.getColumn(e, r);
  }
  getColumn(e, r) {
    return _(this.dataSources[r].store, e);
  }
  getRawColumns() {
    return de(this.dataSources, ((e, r, i) => (e[i] = r.store.get("source"), e)), { rgCol: [], colPinStart: [], colPinEnd: [] });
  }
  getColumns(e = "all") {
    const r = this.getRawColumns();
    return e !== "all" ? r[e] : k.reduce(((i, o) => [...i, ...r[o]]), []);
  }
  getColumnIndexByProp(e, r) {
    return ia(this.dataSources[r].store, e);
  }
  getColumnByProp(e) {
    var r;
    return (r = this.collection) === null || r === void 0 ? void 0 : r.columnByProp[e];
  }
  refreshByType(e) {
    this.dataSources[e].refresh();
  }
  setColumns(e) {
    return k.forEach(((r) => {
      this.dataSources[r].updateData(e.columns[r], { depth: e.maxLevel, groups: e.columnGrouping[r].reduce(((i, o) => (i[o.level] || (i[o.level] = []), i[o.level].push(o), i)), {}) });
    })), this.collection = e, e;
  }
  updateColumns(e) {
    const r = e.reduce(((o, s) => {
      const n = fr(s);
      return o[n] || (o[n] = {}), o[n][s.prop] = s, o;
    }), {}), i = {};
    for (const o in r) {
      if (!r.hasOwnProperty(o)) continue;
      const s = o, n = r[s], l = this.dataSources[s].store.get("source");
      i[s] = {};
      for (let a = 0; a < l.length; a++) {
        const c = n?.[l[a].prop];
        c && (i[s][a] = c);
      }
    }
    for (const o in i) i.hasOwnProperty(o) && ta(this.dataSources[o].store, i[o] || {});
  }
  updateColumn(e, r) {
    const i = fr(e);
    Vo(this.dataSources[i].store, { [r]: e });
  }
}
class zd {
  constructor(e) {
    this.dimensionProvider = e, this.stores = de(G, ((r, i) => (r[i] = new Rt(i), r)), {});
  }
  setData(e, r = "rgRow", i = !1, o, s = !1, n = !1) {
    return this.stores[r].updateData([...e], o, s, n), this.dimensionProvider.setData(e.length, r, r !== "rgRow" || i), e;
  }
  getModel(e, r = "rgRow") {
    return _(this.stores[r].store, e);
  }
  changeOrder({ rowType: e = "rgRow", from: r, to: i }) {
    const o = this.stores[e], s = [...o.store.get("proxyItems")], n = o.store.get("items"), l = s.splice(s.indexOf(n[r]), 1), a = n[r < i ? i + 1 : i], c = a === void 0 ? s.length : s.indexOf(a);
    s.splice(c, 0, ...l), o.setData({ proxyItems: s });
    const d = o.store.get("items");
    this.dimensionProvider.updateSizesPositionByNewDataIndexes(e, d, n);
  }
  setCellData({ type: e, rowIndex: r, prop: i, val: o }, s = !0) {
    const n = this.getModel(r, e);
    n[i] = o, this.stores[e].setSourceData({ [r]: n }, s);
  }
  setRangeData(e, r) {
    const i = {};
    for (let o in e) {
      const s = i[o] = _(this.stores[r].store, parseInt(o, 10));
      if (s) for (let n in e[o]) s[n] = e[o][n];
    }
    this.stores[r].setSourceData(i);
  }
  refresh(e = "all") {
    ba(e) && this.refreshItems(e), G.forEach(((r) => this.refreshItems(r)));
  }
  refreshItems(e = "rgRow") {
    const r = this.stores[e].store.get("items");
    this.stores[e].setData({ items: [...r] });
  }
  setGrouping({ depth: e }, r = "rgRow") {
    this.stores[r].setData({ groupingDepth: e });
  }
  setTrimmed(e, r = "rgRow") {
    const i = this.stores[r];
    i.addTrimmed(e), this.dimensionProvider.setTrimmed(e, r), r === "rgRow" && this.dimensionProvider.setData(Lt(i.store).length, r);
  }
}
const Js = ["rgCol"];
function Zs(t, e = !1, r = Js) {
  return !e && r.includes(t);
}
class Ed {
  constructor(e, r) {
    this.viewports = e;
    const i = Ce(((o) => r.realSizeChanged(o)), Yo);
    this.stores = [...G, ...k].reduce(((o, s) => (o[s] = new Kc(s), o[s].store.onChange("realSize", (() => i(s))), o)), {});
  }
  clearSize(e, r) {
    this.stores[e].drop(), this.viewports.stores[e].setOriginalSizes(this.stores[e].store.get("originItemSize")), this.setItemCount(r, e);
  }
  setCustomSizes(e, r, i = !1) {
    let o = r;
    if (i) {
      const s = this.stores[e].store.get("sizes");
      o = Object.assign(Object.assign({}, s), r);
    }
    this.stores[e].setDimensionSize(o), this.setViewPortCoordinate({ type: e, force: !0 });
  }
  setItemCount(e, r) {
    this.viewports.stores[r].setViewport({ realCount: e }), this.stores[r].setStore({ count: e });
  }
  setTrimmed(e, r) {
    const i = Mr(e);
    this.stores[r].setStore({ trimmed: i }), this.setViewPortCoordinate({ type: r, force: !0 });
  }
  setData(e, r, i = !1) {
    if (this.setItemCount(e, r), i) {
      const o = this.stores[r].getCurrentState();
      this.viewports.stores[r].setViewport({ virtualSize: o.realSize });
    }
    this.setViewPortCoordinate({ type: r });
  }
  applyNewColumns(e, r, i = !1, o = Js) {
    for (let s of k) {
      i || this.stores[s].drop();
      const n = e[s], l = !Zs(s, r, o);
      this.stores[s].setStore({ count: n.length });
      const a = va(n);
      this.stores[s].setDimensionSize(a);
      const c = { realCount: n.length };
      l && (c.virtualSize = this.stores[s].getCurrentState().realSize), this.viewports.stores[s].setViewport(c), this.setViewPortCoordinate({ type: s });
    }
  }
  getFullSize() {
    var e, r;
    let i = 0, o = 0;
    for (let s of k) i += ((e = this.stores[s]) === null || e === void 0 ? void 0 : e.store.get("realSize")) || 0;
    for (let s of G) o += ((r = this.stores[s]) === null || r === void 0 ? void 0 : r.store.get("realSize")) || 0;
    return { y: o, x: i };
  }
  setViewPortCoordinate({ type: e, coordinate: r = this.viewports.stores[e].lastCoordinate, force: i = !1 }) {
    const o = this.stores[e].getCurrentState(), s = this.viewports.stores[e].store, n = s.get("clientSize"), l = s.get("virtualSize"), a = Wr({ contentSize: o.realSize, clientSize: n, virtualSize: l }), c = n && l ? a.getRenderOffset(Math.min(Math.max(0, r), a.logicalScrollSize)) : 0;
    this.stores[e].setStore({ renderOffset: c }), this.viewports.stores[e].setViewport({ renderOffset: c }), this.viewports.stores[e].setViewPortCoordinate(r, o, i);
  }
  getViewPortPos(e) {
    const r = this.stores[e.dimension].getCurrentState();
    return ae(r, e.coordinate).start;
  }
  setSettings(e, r) {
    let i = [];
    switch (r) {
      case "rgCol":
        i = k;
        break;
      case "rgRow":
        i = G;
    }
    for (let o of i) this.stores[o].setStore(e);
  }
  updateSizesPositionByNewDataIndexes(e, r, i = []) {
    this.stores[e].updateSizesPositionByIndexes(r, i), this.setViewPortCoordinate({ type: e, force: !0 });
  }
}
class Dd {
  constructor() {
    this.stores = de([...G, ...k], ((e, r) => (e[r] = new js(r), e)), {});
  }
  setViewport(e, r) {
    this.stores[e].setViewport(r);
  }
}
class Td {
  constructor(e, r) {
    var i;
    this.config = e;
    const o = [];
    let s = 0;
    k.forEach(((n) => {
      const l = e.columnProvider.stores[n].store;
      if (!l.get("items").length) return;
      const a = { colType: n, position: { x: s, y: 1 }, contentHeight: r, fixWidth: n !== "rgCol", viewports: e.viewportProvider.stores, dimensions: e.dimensionProvider.stores, rowStores: e.dataProvider.stores, noHorizontalScrollTransfer: e.noHorizontalScrollTransfer, colStore: l, onHeaderresize: (u) => this.onColumnResize(n, u, l), onResizeviewport: (u) => {
        var g;
        const p = { clientSize: u.detail.size }, v = /* @__PURE__ */ (function(w, x) {
          return x === "rgCol" ? w : x;
        })(n, u.detail.dimension), y = k.includes(v) && Zs(v, e.disableVirtualX, e.virtualX);
        (v === "rgRow" && !e.disableVirtualY || y) && (p.virtualSize = u.detail.size), (g = e.viewportProvider) === null || g === void 0 || g.setViewport(v, p);
      } }, c = (function(u) {
        const g = u.dimensions[u.colType].store, p = g.get("realSize"), v = { contentWidth: p, class: u.colType, contentHeight: u.contentHeight, key: u.colType, colType: u.colType, noHorizontalScrollTransfer: u.noHorizontalScrollTransfer, onResizeviewport: u.onResizeviewport, style: u.fixWidth ? { minWidth: p + "px" } : void 0 }, y = { colData: Lt(u.colStore), dimensionCol: g, type: u.colType, groups: u.colStore.get("groups"), groupingDepth: u.colStore.get("groupingDepth"), resizeHandler: u.colType === "colPinEnd" ? ["l"] : void 0, onHeaderresize: u.onHeaderresize };
        return { prop: v, type: u.colType, position: u.position, headerProp: y, viewportCol: u.viewports[u.colType].store };
      })(a), d = this.registerCol(c.position.x, n), h = this.dataViewPort(a).reduce(((u, g) => {
        const p = this.registerSegment(g.position, g.lastCell), v = this.registerRow(g.position.y, g.type), y = Object.assign(Object.assign({ colType: n }, g), { rowSelectionStore: v, selectionStore: p.store, onSetrange: (w) => {
          p.setRangeArea(w.detail);
        }, onSettemprange: (w) => p.setTempArea(w.detail), onFocuscell: (w) => {
          p.clearFocus(), e.selectionStoreConnector.focus(p, w.detail);
        } });
        return u.push(y), u;
      }), []);
      o.push(Object.assign(Object.assign({}, c), { columnSelectionStore: d, dataPorts: h })), s++;
    })), this.columns = o, (i = this.config.scrollingService) === null || i === void 0 || i.unregister();
  }
  onColumnResize(e, { detail: r }, i) {
    var o;
    (o = this.config.dimensionProvider) === null || o === void 0 || o.setCustomSizes(e, r, !0);
    const s = {};
    for (const n of Object.keys(r || {})) {
      const l = r[n], a = parseInt(n, 10), c = _(i, a);
      c && (s[a] = Object.assign(Object.assign({}, c), { size: l }));
    }
    this.config.resize(s);
  }
  registerSegment(e, r) {
    const i = this.config.selectionStoreConnector.register(e);
    return i.setLastCell(r), i;
  }
  registerRow(e, r) {
    return this.config.selectionStoreConnector.registerRow(e, r).store;
  }
  registerCol(e, r) {
    return this.config.selectionStoreConnector.registerColumn(e, r).store;
  }
  dataViewPort(e) {
    const r = { rowPinStart: It, rgRow: bs, rowPinEnd: ys };
    let i = 0;
    return G.reduce(((o, s) => {
      const n = Object.assign(Object.assign({}, e), { position: Object.assign(Object.assign({}, e.position), { y: i }) }), l = Fa(n, s, r[s], s !== "rgRow");
      return o.push(l), i++, o;
    }), []);
  }
  scrollToCell(e) {
    for (let r in e) {
      const i = e[r];
      typeof i == "number" && this.config.scrollingService.proxyScroll({ dimension: r === "x" ? "rgCol" : "rgRow", coordinate: i });
    }
  }
  clearFocused() {
    this.config.selectionStoreConnector.clearAll();
  }
  clearEdit() {
    this.config.selectionStoreConnector.setEdit(!1);
  }
  getFocused() {
    const e = this.config.selectionStoreConnector.focusedStore;
    if (!e) return null;
    const r = this.config.selectionStoreConnector.storesXToType[e.position.x], i = this.config.columnProvider.getColumn(e.cell.x, r), o = this.config.selectionStoreConnector.storesYToType[e.position.y];
    return { column: i, model: this.config.dataProvider.getModel(e.cell.y, o), cell: e.cell, colType: r, rowType: o };
  }
  getStoreCoordinateByType(e, r) {
    const i = this.config.selectionStoreConnector.storesByType;
    if (i[e] !== void 0 && i[r] !== void 0) return { x: i[e], y: i[r] };
  }
  setFocus(e, r, i, o) {
    var s;
    const n = this.getStoreCoordinateByType(e, r);
    n && ((s = this.config.selectionStoreConnector) === null || s === void 0 || s.focusByCell(n, i, o));
  }
  getSelectedRange() {
    const e = this.config.selectionStoreConnector.focusedStore;
    if (!e) return null;
    const r = this.config.selectionStoreConnector.storesXToType[e.position.x], i = this.config.selectionStoreConnector.storesYToType[e.position.y], o = e.entity.store.get("range");
    return o ? Object.assign(Object.assign({}, o), { colType: r, rowType: i }) : null;
  }
  setEdit(e, r, i, o) {
    var s;
    const n = this.getStoreCoordinateByType(i, o);
    n && ((s = this.config.selectionStoreConnector) === null || s === void 0 || s.setEditByCell(n, { x: r, y: e }));
  }
}
class kd {
  constructor(e) {
    this.setViewport = e, this.elements = {};
  }
  async proxyScroll(e, r, i) {
    var o;
    let s, n = e;
    for (let a in i ? {} : this.elements) if (e.dimension !== "rgCol" || a !== "headerRow") if (this.isPinnedColumn(r) && e.dimension === "rgCol") {
      if (a === r || !e.delta) continue;
      for (let c of this.elements[a]) c.changeScroll && (s = c.changeScroll(e));
    } else for (let c of this.elements[a]) await ((o = c.setScroll) === null || o === void 0 ? void 0 : o.call(c, e));
    const l = await s;
    l && (n = l), this.setViewport(i && this.isPinnedColumn(r) ? Object.assign(Object.assign({}, n), { dimension: r }) : n);
  }
  async scrollSilentService(e, r) {
    var i;
    for (let o in this.elements) if (o !== r && !(!k.includes(r) || o !== "headerRow" && !k.includes(o))) for (let s of this.elements[o]) await ((i = s.changeScroll) === null || i === void 0 ? void 0 : i.call(s, e, !0));
  }
  isPinnedColumn(e) {
    return !!e && ["colPinStart", "colPinEnd"].indexOf(e) > -1;
  }
  registerElements(e) {
    this.elements = e;
  }
  registerElement(e, r) {
    this.elements[r] || (this.elements[r] = []), e ? this.elements[r].push(e) : this.elements[r] && delete this.elements[r];
  }
  unregister() {
    this.elements = {};
  }
}
class Pd {
  constructor() {
    this.stores = {}, this.columnStores = {}, this.rowStores = {}, this.storesByType = {}, this.storesXToType = {}, this.storesYToType = {};
  }
  get focusedStore() {
    var e;
    for (let r in this.stores) for (let i in this.stores[r]) {
      const o = (e = this.stores[r][i]) === null || e === void 0 ? void 0 : e.store.get("focus");
      if (o) return { entity: this.stores[r][i], cell: o, position: { x: parseInt(i, 10), y: parseInt(r, 10) } };
    }
    return null;
  }
  get edit() {
    var e;
    return (e = this.focusedStore) === null || e === void 0 ? void 0 : e.entity.store.get("edit");
  }
  get focused() {
    var e;
    return (e = this.focusedStore) === null || e === void 0 ? void 0 : e.entity.store.get("focus");
  }
  get selectedRange() {
    var e;
    return (e = this.focusedStore) === null || e === void 0 ? void 0 : e.entity.store.get("range");
  }
  registerColumn(e, r) {
    return this.updateColumnTypeMapping(e, r), this.columnStores[e] || (this.columnStores[e] = new Yt()), this.columnStores[e];
  }
  registerRow(e, r) {
    return this.rowStores[e] || (this.rowStores[e] = new Yt(), this.storesByType[r] = e, this.storesYToType[e] = r), this.rowStores[e];
  }
  register({ x: e, y: r }) {
    this.stores[r] || (this.stores[r] = {});
    let i = this.stores[r][e];
    return i || (this.stores[r][e] = i = new Yt(), i.onChange("range", ((o) => {
      this.columnStores[e].setRangeArea(o), this.rowStores[r].setRangeArea(o);
    })), i.store.on("dispose", (() => this.destroy(e, r))), i);
  }
  destroy(e, r) {
    var i, o;
    if ((i = this.columnStores[e]) === null || i === void 0 || i.dispose(), (o = this.rowStores[r]) === null || o === void 0 || o.dispose(), delete this.rowStores[r], delete this.columnStores[e], this.storesXToType[e]) {
      const s = this.storesXToType[e];
      delete this.storesXToType[e], delete this.storesByType[s];
    }
    if (this.storesYToType[r]) {
      const s = this.storesYToType[r];
      delete this.storesYToType[r], delete this.storesByType[s];
    }
    this.stores[r] && delete this.stores[r][e], Object.keys(this.stores[r] || {}).length || delete this.stores[r];
  }
  setEditByCell(e, r) {
    this.focusByCell(e, r, r), this.setEdit("");
  }
  beforeNextFocusCell(e) {
    var r;
    if (!this.focusedStore) return;
    const i = this.focusedStore.entity.store.get("lastCell"), o = i && this.getNextStore(e, this.focusedStore.position, i);
    (r = o?.store) === null || r === void 0 || r.setNextFocus(Object.assign(Object.assign({}, e), o.item));
  }
  focusByCell(e, r, i) {
    this.focus(this.stores[e.y][e.x], { focus: r, end: i });
  }
  focus(e, { focus: r, end: i }) {
    const o = this.getCurrentStorePointer(e);
    if (!o) return null;
    const s = e.store.get("lastCell"), n = s && this.getNextStore(r, o, s);
    if (n?.store) {
      const l = Object.assign(Object.assign({}, r), n.item);
      return this.focus(n.store, { focus: l, end: l }), null;
    }
    return s && (r = Vi(r, s), i = Vi(i, s)), e.setFocus(r, i), r;
  }
  getCurrentStorePointer(e) {
    let r;
    for (let i in this.stores) for (let o in this.stores[i]) {
      const s = this.stores[i][o];
      s !== e ? s.clearFocus() : r = { x: parseInt(o, 10), y: parseInt(i, 10) };
    }
    return r;
  }
  getNextStore(e, r, i) {
    const o = ya(e, i);
    let s;
    o && Object.keys(o).forEach(((l) => {
      var a;
      const c = l, d = (a = o[c]) !== null && a !== void 0 ? a : 0;
      let h;
      switch (c) {
        case "x":
          h = this.getXStores(r.y);
          break;
        case "y":
          h = this.getYStores(r.x);
      }
      if (d >= 0) s = h[++r[c]];
      else {
        s = h[--r[c]];
        const u = s?.store.get("lastCell");
        u && (o[c] = u[c] + d);
      }
    }));
    const n = s?.store.get("lastCell");
    return n?.x && n?.y || (s = void 0), { store: s, item: o };
  }
  clearAll() {
    var e;
    for (let r in this.stores) for (let i in this.stores[r]) (e = this.stores[r][i]) === null || e === void 0 || e.clearFocus();
  }
  setEdit(e) {
    this.focusedStore && this.focusedStore.entity.setEdit(e);
  }
  selectAll() {
    for (let e in this.stores) for (let r in this.stores[e]) {
      const i = this.stores[e][r];
      if (!i) continue;
      const o = i.store.get("lastCell");
      o && i.setRange({ x: 0, y: 0 }, { x: o.x - 1, y: o.y - 1 });
    }
  }
  getXStores(e) {
    return this.stores[e];
  }
  getYStores(e) {
    const r = {};
    for (let i in this.stores) r[i] = this.stores[i][e];
    return r;
  }
  updateColumnTypeMapping(e, r) {
    const i = this.storesXToType[e], o = this.storesByType[r];
    let s = !1;
    this.storesByType[r] = e, this.storesXToType[e] = r, i && i !== r && (s = !0, this.storesByType[i] === e && delete this.storesByType[i]), typeof o == "number" && o !== e && this.storesXToType[o] === r && (delete this.storesXToType[o], s = !0), s && this.clearAll();
  }
}
class jd {
  constructor() {
    this.parentY = 0;
  }
  start(e, { pos: r, text: i, event: o }) {
    var s;
    const { top: n } = e.getBoundingClientRect();
    this.parentY = n, this.text && (this.text.innerText = i), this.move(r), this.moveTip({ x: o.x, y: o.y }), (s = this.el) === null || s === void 0 || s.classList.remove("hidden");
  }
  end() {
    var e;
    (e = this.el) === null || e === void 0 || e.classList.add("hidden");
  }
  move(e) {
    this.moveElement(e.end - this.parentY);
  }
  moveTip({ x: e, y: r }) {
    this.draggable && (this.draggable.style.left = e + "px", this.draggable.style.top = r + "px");
  }
  moveElement(e) {
    this.rgRow && (this.rgRow.style.transform = `translateY(${e}px)`);
  }
}
const Ld = ({ ref: t }) => {
  const e = new jd();
  return t(e), f("div", { class: "draggable-wrapper hidden", ref: (r) => e.el = r }, f("div", { class: "draggable", ref: (r) => e.draggable = r }, f("span", { class: "revo-alt-icon" }), f("span", { ref: (r) => e.text = r })), f("div", { class: "drag-position", ref: (r) => e.rgRow = r }));
};
class Fd extends re {
  constructor(e, r) {
    super(e, r), e.setAttribute("role", "treegrid"), e.setAttribute("aria-keyshortcuts", "Enter"), e.setAttribute("aria-multiselectable", "true"), e.setAttribute("tabindex", "0"), this.addEventListener("beforecolumnsset", (({ detail: i }) => {
      const o = [...i.columns.colPinStart, ...i.columns.rgCol, ...i.columns.colPinEnd];
      e.setAttribute("aria-colcount", "" + o.length), o.forEach(((s, n) => {
        const { columnProperties: l, cellProperties: a } = s;
        s.columnProperties = (...c) => {
          const d = l?.(...c) || {};
          return d.role = "columnheader", d["aria-colindex"] = "" + n, d;
        }, s.cellProperties = (...c) => {
          const d = { role: "gridcell", "aria-colindex": "" + n, "aria-rowindex": "" + c[0].rowIndex, tabindex: -1 }, h = a?.(...c) || {};
          return Object.assign(Object.assign({}, d), h);
        };
      }));
    })), this.addEventListener("beforesourceset", (({ detail: i }) => {
      e.setAttribute("aria-rowcount", "" + i.source.length);
    })), this.addEventListener("beforerowrender", (({ detail: i }) => {
      i.node.i = Object.assign(Object.assign({}, i.node.i), { role: "row", "aria-rowindex": i.item.itemIndex });
    })), this.addEventListener("afterfocus", (async (i) => {
      if (i.defaultPrevented) return;
      const o = this.revogrid.querySelector(`revogr-data[type="${i.detail.rowType}"][col-type="${i.detail.colType}"] [data-rgrow="${i.detail.rowIndex}"][data-rgcol="${i.detail.colIndex}"]`);
      o instanceof HTMLElement && o.focus();
    }));
  }
}
class Id {
  constructor() {
    this.internalPlugins = [];
  }
  get() {
    return [...this.internalPlugins];
  }
  add(e) {
    this.internalPlugins.push(e);
  }
  addUserPluginsAndCreate(e, r = [], i, o) {
    o && ((i?.filter(((s) => !r.some(((n) => n === s)))) || []).forEach(((s) => {
      var n, l;
      const a = this.internalPlugins.findIndex(((c) => c instanceof s));
      a !== -1 && ((l = (n = this.internalPlugins[a]).destroy) === null || l === void 0 || l.call(n), this.internalPlugins.splice(a, 1));
    })), r?.forEach(((s) => {
      this.internalPlugins.find(((n) => n instanceof s)) || this.add(new s(e, o));
    })));
  }
  getByClass(e) {
    return this.internalPlugins.find(((r) => r instanceof e));
  }
  remove(e) {
    var r, i;
    const o = this.internalPlugins.indexOf(e);
    o > -1 && ((i = (r = this.internalPlugins[o]).destroy) === null || i === void 0 || i.call(r), this.internalPlugins.splice(o, 1));
  }
  destroy() {
    this.internalPlugins.forEach(((e) => {
      var r;
      return (r = e.destroy) === null || r === void 0 ? void 0 : r.call(e);
    })), this.internalPlugins = [];
  }
}
class _d extends re {
  constructor(e, r) {
    super(e, r), this.isRTLEnabled = !1, this.init();
  }
  init() {
    this.addEventListener("beforecolumnsset", ((e) => {
      this.handleBeforeColumnsSet(e);
    })), this.addEventListener("aftergridinit", (() => {
      this.updateRTLState();
    })), this.watch("rtl", ((e) => {
      this.isRTLEnabled = e, this.emit("rtlstatechanged", { rtl: this.isRTLEnabled });
    }), { immediate: !0 });
  }
  handleBeforeColumnsSet(e) {
    if (!this.isRTLEnabled) return;
    const r = this.applyRTLTransformationToCollection(e.detail);
    e.detail.columns = r.columns, e.detail.columnByProp = r.columnByProp, e.detail.columnGrouping = r.columnGrouping;
  }
  applyRTLTransformationToCollection(e) {
    const r = { columns: { rgCol: [], colPinStart: [], colPinEnd: [] }, columnByProp: Object.assign({}, e.columnByProp), columnGrouping: { rgCol: [], colPinStart: [], colPinEnd: [] }, maxLevel: e.maxLevel, sort: Object.assign({}, e.sort) };
    return Object.keys(e.columns).forEach(((i) => {
      const o = i, s = e.columns[o], n = [...s].reverse();
      r.columns[o] = n, r.columnGrouping[o] = this.applyRTLTransformationToGroups(e.columnGrouping[o], s.length);
    })), r;
  }
  applyRTLTransformationToGroups(e, r) {
    return e.map(((i) => {
      const o = i.indexes.map(((s) => r - 1 - s)).reverse();
      return Object.assign(Object.assign({}, i), { indexes: o });
    })).reverse();
  }
  updateRTLState() {
    const e = this.revogrid;
    e && typeof e.rtl == "boolean" && (this.isRTLEnabled = e.rtl);
  }
  getRTLState() {
    return this.isRTLEnabled;
  }
  destroy() {
    super.destroy();
  }
}
const Ad = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.contentsizechanged = m(this, "contentsizechanged", 7), this.beforeedit = m(this, "beforeedit", 7), this.beforerangeedit = m(this, "beforerangeedit", 7), this.afteredit = m(this, "afteredit", 7), this.beforeautofill = m(this, "beforeautofill", 7), this.beforerange = m(this, "beforerange", 7), this.afterfocus = m(this, "afterfocus", 7), this.roworderchanged = m(this, "roworderchanged", 7), this.beforesorting = m(this, "beforesorting", 7), this.beforesourcesortingapply = m(this, "beforesourcesortingapply", 7), this.beforesortingapply = m(this, "beforesortingapply", 7), this.aftersortingapply = m(this, "aftersortingapply", 7), this.rowdragstart = m(this, "rowdragstart", 7), this.headerclick = m(this, "headerclick", 7), this.beforecellfocus = m(this, "beforecellfocus", 7), this.beforefocuslost = m(this, "beforefocuslost", 7), this.beforesourceset = m(this, "beforesourceset", 7), this.beforeanysource = m(this, "beforeanysource", 7), this.aftersourceset = m(this, "aftersourceset", 7), this.afteranysource = m(this, "afteranysource", 7), this.beforecolumnsgather = m(this, "beforecolumnsgather", 7), this.beforecolumnsset = m(this, "beforecolumnsset", 7), this.beforecolumnapplied = m(this, "beforecolumnapplied", 7), this.aftercolumnsset = m(this, "aftercolumnsset", 7), this.beforefilterapply = m(this, "beforefilterapply", 7), this.beforefiltertrimmed = m(this, "beforefiltertrimmed", 7), this.beforetrimmed = m(this, "beforetrimmed", 7), this.aftertrimmed = m(this, "aftertrimmed", 7), this.viewportscroll = m(this, "viewportscroll", 7), this.beforeexport = m(this, "beforeexport", 7), this.beforeeditstart = m(this, "beforeeditstart", 7), this.aftercolumnresize = m(this, "aftercolumnresize", 7), this.beforerowdefinition = m(this, "beforerowdefinition", 7), this.filterconfigchanged = m(this, "filterconfigchanged", 7), this.sortingconfigchanged = m(this, "sortingconfigchanged", 7), this.rowheaderschanged = m(this, "rowheaderschanged", 7), this.beforegridrender = m(this, "beforegridrender", 7), this.aftergridrender = m(this, "aftergridrender", 7), this.aftergridinit = m(this, "aftergridinit", 7), this.additionaldatachanged = m(this, "additionaldatachanged", 7), this.afterthemechanged = m(this, "afterthemechanged", 7), this.created = m(this, "created", 7), this.frameSize = 1, this.rowSize = 0, this.colSize = 100, this.range = !1, this.readonly = !1, this.resize = !1, this.noHorizontalScrollTransfer = !1, this.canFocus = !0, this.useClipboard = !0, this.columns = [], this.source = [], this.pinnedTopSource = [], this.pinnedBottomSource = [], this.rowDefinitions = [], this.editors = {}, this.applyOnClose = !1, this.plugins = [], this.columnTypes = {}, this.theme = "default", this.rowClass = "", this.autoSizeColumn = !1, this.filter = !1, this.canMoveColumns = !1, this.trimmedRows = {}, this.exporting = !1, this.stretch = !1, this.additionalData = {}, this.disableVirtualX = !1, this.virtualX = ["rgCol"], this.disableVirtualY = !1, this.hideAttribution = !1, this.jobsBeforeRender = [], this.registerVNode = [], this.accessible = !0, this.rtl = !1, this.canDrag = !0, this.extraElements = [], this.pluginService = new Id(), this.viewport = null, this.isInited = !1;
  }
  async refresh(t = "all") {
    if (!this.dataProvider) throw Error("Not connected");
    this.dataProvider.refresh(t);
  }
  async setDataAt({ row: t, col: e, colType: r = "rgCol", rowType: i = "rgRow", val: o, skipDataUpdate: s = !1 }) {
    var n;
    if (this.dataProvider && this.columnProvider && !s) {
      const a = (n = this.columnProvider.getColumn(e, r)) === null || n === void 0 ? void 0 : n.prop;
      a !== void 0 && this.dataProvider.setCellData({ type: i, rowIndex: t, prop: a, val: o }, !1);
    }
    const l = this.element.querySelector(`revogr-data[type="${i}"][col-type="${r}"]`);
    return l?.updateCell({ row: t, col: e });
  }
  async scrollToRow(t = 0) {
    if (!this.dimensionProvider) throw Error("Not connected");
    const e = this.dimensionProvider.getViewPortPos({ coordinate: t, dimension: "rgRow" });
    await this.scrollToCoordinate({ y: e });
  }
  async scrollToColumnIndex(t = 0) {
    if (!this.dimensionProvider) throw Error("Not connected");
    const e = this.dimensionProvider.getViewPortPos({ coordinate: t, dimension: "rgCol" });
    await this.scrollToCoordinate({ x: e });
  }
  async scrollToColumnProp(t, e = "rgCol") {
    if (!this.dimensionProvider || !this.columnProvider) throw Error("Not connected");
    const r = this.columnProvider.getColumnIndexByProp(t, e);
    if (r < 0) return;
    const i = this.dimensionProvider.getViewPortPos({ coordinate: r, dimension: e });
    await this.scrollToCoordinate({ x: i });
  }
  async updateColumns(t) {
    var e;
    (e = this.columnProvider) === null || e === void 0 || e.updateColumns(t);
  }
  async addTrimmed(t, e = "external", r = "rgRow") {
    if (!this.dataProvider) throw Error("Not connected");
    const i = this.beforetrimmed.emit({ trimmed: t, trimmedType: e, type: r });
    return i.defaultPrevented || (this.dataProvider.setTrimmed({ [e]: i.detail.trimmed }, r), this.aftertrimmed.emit()), i;
  }
  async scrollToCoordinate(t) {
    var e;
    (e = this.viewport) === null || e === void 0 || e.scrollToCell(t);
  }
  async setCellEdit(t, e, r = "rgRow") {
    var i;
    const o = vr(this.columns, e);
    if (!o) return;
    await Ae();
    const s = o.pin || "rgCol";
    if (!this.columnProvider) throw Error("Not connected");
    (i = this.viewport) === null || i === void 0 || i.setEdit(t, this.columnProvider.getColumnIndexByProp(e, s), s, r);
  }
  async setCellsFocus(t = { x: 0, y: 0 }, e = { x: 0, y: 0 }, r = "rgCol", i = "rgRow") {
    var o;
    (o = this.viewport) === null || o === void 0 || o.setFocus(r, i, t, e);
  }
  async getSource(t = "rgRow") {
    if (!this.dataProvider) throw Error("Not connected");
    return this.dataProvider.stores[t].store.get("source");
  }
  async getVisibleSource(t = "rgRow") {
    if (!this.dataProvider) throw Error("Not connected");
    return Lt(this.dataProvider.stores[t].store);
  }
  async getSourceStore(t = "rgRow") {
    if (!this.dataProvider) throw Error("Not connected");
    return this.dataProvider.stores[t].store;
  }
  async getColumnStore(t = "rgCol") {
    if (!this.columnProvider) throw Error("Not connected");
    return this.columnProvider.stores[t].store;
  }
  async updateColumnSorting(t, e, r) {
    this.sortingconfigchanged.emit({ columns: [{ prop: t.prop, order: e, cellCompare: t.cellCompare }], additive: r });
  }
  async clearSorting() {
    this.sortingconfigchanged.emit({ columns: [] });
  }
  async getColumns() {
    if (!this.columnProvider) throw Error("Not connected");
    return this.columnProvider.getColumns();
  }
  async clearFocus() {
    var t, e;
    const r = (t = this.viewport) === null || t === void 0 ? void 0 : t.getFocused();
    this.beforefocuslost.emit(r).defaultPrevented || (e = this.selectionStoreConnector) === null || e === void 0 || e.clearAll();
  }
  async getPlugins() {
    return this.pluginService.get();
  }
  async getFocused() {
    var t, e;
    return (e = (t = this.viewport) === null || t === void 0 ? void 0 : t.getFocused()) !== null && e !== void 0 ? e : null;
  }
  async getContentSize() {
    var t;
    if (!this.dimensionProvider) throw Error("Not connected");
    return (t = this.dimensionProvider) === null || t === void 0 ? void 0 : t.getFullSize();
  }
  async getSelectedRange() {
    var t, e;
    return (e = (t = this.viewport) === null || t === void 0 ? void 0 : t.getSelectedRange()) !== null && e !== void 0 ? e : null;
  }
  async refreshExtraElements() {
    var t;
    (t = this.extraService) === null || t === void 0 || t.refresh();
  }
  async getProviders() {
    return this.getPluginData();
  }
  mousedownHandle(t) {
    const e = ce(t, "screenX"), r = ce(t, "screenY");
    e !== null && r !== null && (this.clickTrackForFocusClear = e + r);
  }
  async mouseupHandle(t) {
    var e;
    const r = ce(t, "screenX"), i = ce(t, "screenY");
    if (r === null || i === null || t.defaultPrevented || Math.abs(((e = this.clickTrackForFocusClear) !== null && e !== void 0 ? e : 0) - (r + i)) > 10) return;
    const o = t.composedPath();
    o.includes(this.element) || this.element.shadowRoot && o.includes(this.element.shadowRoot) || await this.clearFocus();
  }
  onRowDragStarted(t) {
    var e;
    const r = this.rowdragstart.emit(t.detail);
    r.defaultPrevented ? t.preventDefault() : (e = this.orderService) === null || e === void 0 || e.start(this.element, Object.assign(Object.assign({}, t.detail), r.detail));
  }
  onRowDragEnd() {
    var t;
    (t = this.orderService) === null || t === void 0 || t.end();
  }
  onRowOrderChange(t) {
    var e;
    (e = this.dataProvider) === null || e === void 0 || e.changeOrder(t.detail);
  }
  onRowDrag({ detail: t }) {
    var e;
    (e = this.orderService) === null || e === void 0 || e.move(t);
  }
  onRowMouseMove(t) {
    var e;
    (e = this.orderService) === null || e === void 0 || e.moveTip(t.detail);
  }
  async onCellEdit(t) {
    var e;
    const { defaultPrevented: r, detail: i } = this.beforeedit.emit(t.detail);
    await Ae(), r || ((e = this.dataProvider) === null || e === void 0 || e.setCellData(i), this.afteredit.emit(i));
  }
  onRangeEdit(t) {
    if (!this.dataProvider) throw Error("Not connected");
    const { defaultPrevented: e, detail: r } = this.beforerangeedit.emit(t.detail);
    e ? t.preventDefault() : (this.dataProvider.setRangeData(r.data, r.type), this.afteredit.emit(r));
  }
  onRangeChanged(t) {
    const e = this.beforerange.emit(t.detail);
    e.defaultPrevented && t.preventDefault(), this.beforeautofill.emit(e.detail).defaultPrevented && t.preventDefault();
  }
  onRowDropped(t) {
    const { defaultPrevented: e } = this.roworderchanged.emit(t.detail);
    e && t.preventDefault();
  }
  onHeaderClick(t) {
    const { defaultPrevented: e } = this.headerclick.emit(Object.assign(Object.assign({}, t.detail.column), { originalEvent: t.detail.originalEvent }));
    e && t.preventDefault();
  }
  onCellFocus(t) {
    const { defaultPrevented: e } = this.beforecellfocus.emit(t.detail);
    this.canFocus && !e || t.preventDefault();
  }
  columnTypesChanged() {
    this.columnChanged(this.columns);
  }
  columnChanged(t = [], e, r = "columns", i = !1) {
    if (!this.dimensionProvider || !this.columnProvider) return;
    const o = i ? void 0 : this.getColumnFocusRestore(), s = this.beforecolumnsgather.emit({ columns: [...t] });
    if (s.defaultPrevented) return;
    const n = is(s.detail.columns, 0, this.columnTypes), l = this.beforecolumnsset.emit(n);
    if (l.defaultPrevented) return;
    this.dimensionProvider.applyNewColumns(l.detail.columns, this.disableVirtualX, i, this.virtualX);
    const a = this.beforecolumnapplied.emit(n);
    if (a.defaultPrevented) return;
    const c = this.columnProvider.setColumns(a.detail);
    o && (this.pendingColumnFocusRestore = o);
    const d = {};
    for (const h of Object.keys(a.detail.sort)) d[h] = a.detail.sort[h].order;
    this.aftercolumnsset.emit({ columns: c, order: d });
  }
  getColumnFocusRestore() {
    var t, e, r, i;
    const o = (t = this.viewport) === null || t === void 0 ? void 0 : t.getFocused(), s = (r = (e = this.selectionStoreConnector) === null || e === void 0 ? void 0 : e.focusedStore) === null || r === void 0 ? void 0 : r.position.x, n = (i = o?.column) === null || i === void 0 ? void 0 : i.prop;
    if (o && n !== void 0 && s !== void 0) return { prop: n, colType: o.colType, colIndex: o.cell.x, prevStoreX: s, rowType: o.rowType, rowIndex: o.cell.y };
  }
  restoreColumnFocusAfterRender() {
    var t, e, r, i;
    const o = this.pendingColumnFocusRestore;
    if (!o || (this.pendingColumnFocusRestore = void 0, !this.viewport || !this.columnProvider)) return;
    const s = (e = (t = this.columnProvider.getColumnByProp(o.prop)) === null || t === void 0 ? void 0 : t[0]) !== null && e !== void 0 ? e : vr(this.columns, o.prop);
    if (!s) return;
    const n = s.pin || "rgCol", l = this.columnProvider.getColumnIndexByProp(o.prop, n);
    if (l < 0 || n === o.colType && l === o.colIndex && o.prevStoreX === ((i = (r = this.selectionStoreConnector) === null || r === void 0 ? void 0 : r.focusedStore) === null || i === void 0 ? void 0 : i.position.x)) return;
    const a = { x: l, y: o.rowIndex };
    this.viewport.setFocus(n, o.rowType, a, a);
  }
  refreshColumnsOnConfigChange(t, e) {
    t !== e && this.columnChanged(this.columns);
  }
  disableVirtualXChanged(t = !1, e = !1) {
    this.refreshColumnsOnConfigChange(t, e);
  }
  virtualXChanged(t = ["rgCol"], e = ["rgCol"]) {
    this.refreshColumnsOnConfigChange(t, e);
  }
  rowSizeChanged(t) {
    this.dimensionProvider && (this.dimensionProvider.setSettings({ originItemSize: t }, "rgRow"), this.rowDefChanged(this.rowDefinitions, this.rowDefinitions, "rowSize", !0));
  }
  themeChanged(t, e, r = "theme", i = !1) {
    this.dimensionProvider && (this.themeService.register(t), this.dimensionProvider.setSettings({ originItemSize: this.themeService.rowSize }, "rgRow"), this.dimensionProvider.setSettings({ originItemSize: this.colSize }, "rgCol"), i || (this.dimensionProvider.setSettings({ originItemSize: this.themeService.rowSize }, "rgRow"), this.rowDefChanged(this.rowDefinitions, this.rowDefinitions, "theme", !0)), this.afterthemechanged.emit(t));
  }
  dataSourceChanged(t = [], e, r) {
    if (!this.dataProvider) return;
    let i = "rgRow";
    switch (r) {
      case "pinnedBottomSource":
        i = "rowPinEnd";
        break;
      case "pinnedTopSource":
        i = "rowPinStart";
        break;
      case "source":
        i = "rgRow", t = this.beforesourceset.emit({ type: i, source: t }).detail.source;
    }
    const o = [...this.beforeanysource.emit({ type: i, source: t }).detail.source];
    this.dataProvider.setData(o, i, this.disableVirtualY), r === "source" && this.aftersourceset.emit({ type: i, source: t }), this.afteranysource.emit({ type: i, source: t });
  }
  disableVirtualYChanged(t = !1, e = !1) {
    t !== e && this.dataSourceChanged(this.source, this.source, "source");
  }
  rowDefChanged(t, e, r, i = !0) {
    if (!this.dimensionProvider || !this.dataProvider) return;
    const { detail: { vals: o, oldVals: s } } = this.beforerowdefinition.emit({ vals: t, oldVals: e }), n = ((l = []) => {
      const a = {};
      for (const c of l) {
        let d = a[c.type];
        d || (d = a[c.type] = {}), typeof c.size == "number" && (d.sizes || (d.sizes = {}), d.sizes[c.index] = c.size);
      }
      return a;
    })(o);
    if (s) {
      const l = ((a = []) => {
        const c = {};
        for (const d of a) {
          let h = c[d.type];
          h || (h = c[d.type] = []), typeof d.size == "number" && h.push(d.index);
        }
        return c;
      })(s);
      for (const a in l) if (l.hasOwnProperty(a)) {
        const c = a, d = this.dataProvider.stores[c].store.get("source").length;
        this.dimensionProvider.clearSize(c, d);
      }
    }
    G.forEach(((l) => {
      var a;
      const c = n[l];
      (c || i) && ((a = this.dimensionProvider) === null || a === void 0 || a.setCustomSizes(l, c?.sizes || {}));
    }));
  }
  trimmedRowsChanged(t = {}) {
    this.addTrimmed(t);
  }
  groupingChanged(t = {}) {
    var e;
    (e = this.pluginService.getByClass(lo)) === null || e === void 0 || e.setGrouping(t || {});
  }
  applyStretch(t) {
    if (!(this.dimensionProvider && this.dataProvider && this.columnProvider && this.viewportProvider)) return;
    t === "false" && (t = !1);
    const e = this.getPluginData();
    if (!e) return;
    const r = this.pluginService.getByClass(io);
    typeof t == "boolean" && t || t === "true" ? r ? Jc(r) && r.applyStretch(this.columnProvider.getRawColumns()) : this.pluginService.add(new io(this.element, e)) : r && this.pluginService.remove(r);
  }
  applyFilter(t) {
    this.filterconfigchanged.emit(t);
  }
  applySorting(t) {
    this.sortingconfigchanged.emit(t);
  }
  rowHeadersChange(t) {
    this.rowheaderschanged.emit(t);
  }
  registerOutsideVNodes(t = []) {
    this.extraElements = t;
  }
  additionalDataChanged(t) {
    this.additionaldatachanged.emit(t);
  }
  rtlChanged() {
    this.columnChanged(this.columns);
  }
  pluginsChanged(t = [], e) {
    this.pluginService.addUserPluginsAndCreate(this.element, t, e, this.getPluginData());
  }
  setPlugins() {
    this.removePlugins();
    const t = this.getPluginData();
    t && (this.setCorePlugins(t), this.pluginsChanged(this.plugins));
  }
  setCorePlugins(t) {
    this.accessible && this.pluginService.add(new Fd(this.element, t)), this.pluginService.add(new _d(this.element, t)), this.autoSizeColumn && this.pluginService.add(new qc(this.element, t, typeof this.autoSizeColumn == "object" ? this.autoSizeColumn : void 0)), this.filter && this.pluginService.add(new ld(this.element, t, typeof this.filter == "object" ? this.filter : void 0)), this.exporting && this.pluginService.add(new td(this.element, t)), this.pluginService.add(new qs(this.element, t)), this.pluginService.add(new lo(this.element, t)), this.canMoveColumns && this.pluginService.add(new $d(this.element, t));
  }
  getPluginData() {
    if (this.dimensionProvider && this.dataProvider && this.columnProvider && this.viewportProvider && this.selectionStoreConnector) return { data: this.dataProvider, column: this.columnProvider, dimension: this.dimensionProvider, viewport: this.viewportProvider, selection: this.selectionStoreConnector, plugins: this.pluginService };
  }
  removePlugins() {
    this.pluginService.destroy();
  }
  connectedCallback() {
    this.isInited && this.setPlugins(), this.created.emit();
  }
  componentWillLoad() {
    var t;
    this.viewportProvider = new Dd(), this.themeService = new Gc({ rowSize: this.rowSize }), this.dimensionProvider = new Ed(this.viewportProvider, { realSizeChanged: (e) => this.contentsizechanged.emit(e) }), this.columnProvider = new Od(), this.selectionStoreConnector = new Pd(), this.dataProvider = new zd(this.dimensionProvider), this.registerOutsideVNodes(this.registerVNode), this.setPlugins(), this.applyStretch(this.stretch), this.themeChanged(this.theme, void 0, void 0, !0), this.columnChanged(this.columns, void 0, void 0, !0), this.dataSourceChanged(this.source, void 0, "source"), this.dataSourceChanged(this.pinnedTopSource, void 0, "pinnedTopSource"), this.dataSourceChanged(this.pinnedBottomSource, void 0, "pinnedBottomSource"), Object.keys((t = this.trimmedRows) !== null && t !== void 0 ? t : {}).length > 0 && this.trimmedRowsChanged(this.trimmedRows), this.rowDefChanged(this.rowDefinitions, void 0, void 0, !1), this.grouping && Object.keys(this.grouping).length > 0 && this.groupingChanged(this.grouping), this.scrollingService = new kd(((e) => {
      var r;
      (r = this.dimensionProvider) === null || r === void 0 || r.setViewPortCoordinate({ coordinate: e.coordinate, type: e.dimension }), this.viewportscroll.emit(e);
    })), this.aftergridinit.emit(), this.isInited = !0;
  }
  componentWillRender() {
    return !this.beforegridrender.emit().defaultPrevented && Promise.all(this.jobsBeforeRender);
  }
  componentDidRender() {
    this.restoreColumnFocusAfterRender(), this.aftergridrender.emit();
  }
  render() {
    if (!(this.dimensionProvider && this.dataProvider && this.columnProvider && this.viewportProvider && this.selectionStoreConnector)) return;
    const t = this.dimensionProvider.stores.rgRow.store.get("realSize");
    this.viewport = new Td({ columnProvider: this.columnProvider, dataProvider: this.dataProvider, dimensionProvider: this.dimensionProvider, viewportProvider: this.viewportProvider, scrollingService: this.scrollingService, orderService: this.orderService, selectionStoreConnector: this.selectionStoreConnector, noHorizontalScrollTransfer: this.noHorizontalScrollTransfer, disableVirtualX: this.disableVirtualX, virtualX: this.virtualX, disableVirtualY: this.disableVirtualY, resize: (d) => this.aftercolumnresize.emit(d) }, t);
    const e = [];
    if (this.rowHeaders && this.viewport.columns.length) {
      const d = this.viewport.columns[0];
      e.push(f("revogr-row-headers", { additionalData: this.additionalData, height: t, rowClass: this.rowClass, resize: this.resize, dataPorts: d.dataPorts, headerProp: d.headerProp, jobsBeforeRender: this.jobsBeforeRender, rowHeaderColumn: typeof this.rowHeaders == "object" ? this.rowHeaders : void 0, onScrollview: ({ detail: h }) => this.scrollingService.proxyScroll(h, "headerRow"), onRef: ({ detail: h }) => this.scrollingService.registerElement(h, "headerRow") }));
    }
    const r = /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0, i = [];
    for (let d of this.viewport.columns) {
      const h = Object.assign(Object.assign({}, d.headerProp), { type: d.type, additionalData: this.additionalData, viewportCol: d.viewportCol, selectionStore: d.columnSelectionStore, canResize: this.resize, readonly: this.readonly, columnFilter: !!this.filter }), u = [f("revogr-header", Object.assign({}, h, { slot: It }))];
      d.dataPorts.forEach(((g) => {
        const p = `${g.type}_${d.type}`, v = f("revogr-overlay-selection", Object.assign({}, g, { canDrag: this.canDrag && g.canDrag, isMobileDevice: r, onSelectall: () => {
          var y;
          return (y = this.selectionStoreConnector) === null || y === void 0 ? void 0 : y.selectAll();
        }, editors: this.editors, readonly: this.readonly, range: this.range, useClipboard: this.useClipboard, applyChangesOnClose: this.applyOnClose, additionalData: this.additionalData, slot: g.slot, onBeforenextvpfocus: (y) => {
          var w;
          return (w = this.selectionStoreConnector) === null || w === void 0 ? void 0 : w.beforeNextFocusCell(y.detail);
        }, onCanceledit: () => {
          var y;
          return (y = this.selectionStoreConnector) === null || y === void 0 ? void 0 : y.setEdit(!1);
        }, onSetedit: (y) => {
          var w;
          this.beforeeditstart.emit(y.detail).defaultPrevented ? y.preventDefault() : (w = this.selectionStoreConnector) === null || w === void 0 || w.setEdit(y.detail.val);
        } }), f("revogr-data", Object.assign({}, g, { colType: d.type, key: p, readonly: this.readonly, range: this.range, rowClass: this.rowClass, rowSelectionStore: g.rowSelectionStore, additionalData: this.additionalData, jobsBeforeRender: this.jobsBeforeRender, slot: ja }), f("slot", { name: `data-${d.type}-${g.type}` })), f("revogr-temp-range", { selectionStore: g.selectionStore, dimensionRow: g.dimensionRow, dimensionCol: g.dimensionCol }), f("revogr-focus", { colData: g.colData, dataStore: g.dataStore, focusTemplate: this.focusTemplate, rowType: g.type, colType: d.type, selectionStore: g.selectionStore, dimensionRow: g.dimensionRow, dimensionCol: g.dimensionCol }, f("slot", { name: `focus-${d.type}-${g.type}` })));
        u.push(v);
      })), i.push(f("revogr-viewport-scroll", Object.assign({}, d.prop, { ref: (g) => this.scrollingService.registerElement(g, "" + d.prop.key), onScrollviewport: (g) => {
        this.scrollingService.proxyScroll(g.detail, "" + d.prop.key, this.noHorizontalScrollTransfer && g.detail.dimension === "rgCol");
      }, onScrollviewportsilent: (g) => this.scrollingService.scrollSilentService(g.detail, "" + d.prop.key) }), u));
    }
    e.push(i);
    const o = "rgRow", s = "rgCol", n = this.viewportProvider.stores, l = this.dimensionProvider.stores, a = f("revogr-scroll-virtual", { class: "vertical", dimension: o, clientSize: n[o].store.get("clientSize"), virtualSize: n[o].store.get("virtualSize"), realSize: l[o].store.get("realSize"), ref: (d) => this.scrollingService.registerElement(d, "rowScroll"), onScrollvirtual: (d) => this.scrollingService.proxyScroll(d.detail) }), c = f("revogr-scroll-virtual", { class: "horizontal", dimension: s, clientSize: n[s].store.get("clientSize"), virtualSize: n[s].store.get("virtualSize"), realSize: l[s].store.get("realSize"), ref: (d) => this.scrollingService.registerElement(d, "colScroll"), onScrollvirtual: (d) => this.scrollingService.proxyScroll(d.detail) });
    return f(M, { dir: this.rtl ? "rtl" : "ltr" }, this.hideAttribution ? null : f("revogr-attribution", { class: "attribution" }), f("slot", { name: "header" }), f("div", { class: "main-viewport", onClick: (d) => {
      var h;
      d.currentTarget === d.target && ((h = this.viewport) === null || h === void 0 || h.clearEdit());
    } }, f("div", { class: "viewports" }, f("slot", { name: "viewport" }), e, a, f(Ld, { ref: (d) => this.orderService = d }))), c, f("revogr-extra", { ref: (d) => this.extraService = d, nodes: this.extraElements }), f("slot", { name: "footer" }));
  }
  disconnectedCallback() {
    this.removePlugins();
  }
  get element() {
    return this;
  }
  static get watchers() {
    return { columnTypes: [{ columnTypesChanged: 0 }], columns: [{ columnChanged: 0 }], disableVirtualX: [{ disableVirtualXChanged: 0 }], virtualX: [{ virtualXChanged: 0 }], rowSize: [{ rowSizeChanged: 0 }], theme: [{ themeChanged: 0 }], source: [{ dataSourceChanged: 0 }], pinnedBottomSource: [{ dataSourceChanged: 0 }], pinnedTopSource: [{ dataSourceChanged: 0 }], disableVirtualY: [{ disableVirtualYChanged: 0 }], rowDefinitions: [{ rowDefChanged: 0 }], trimmedRows: [{ trimmedRowsChanged: 0 }], grouping: [{ groupingChanged: 0 }], stretch: [{ applyStretch: 0 }], filter: [{ applyFilter: 0 }], sorting: [{ applySorting: 0 }], rowHeaders: [{ rowHeadersChange: 0 }], registerVNode: [{ registerOutsideVNodes: 0 }], additionalData: [{ additionalDataChanged: 0 }], rtl: [{ rtlChanged: 0 }], plugins: [{ pluginsChanged: 0 }] };
  }
  static get style() {
    return `revo-grid[theme=default],revo-grid:not([theme]){border:1px solid var(--revo-grid-header-border);font-size:12px}revo-grid[theme=default] .rowHeaders revogr-header,revo-grid:not([theme]) .rowHeaders revogr-header{box-shadow:-1px 0 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] revogr-header,revo-grid:not([theme]) revogr-header{text-align:center;line-height:30px;background-color:var(--revo-grid-header-bg)}revo-grid[theme=default] revogr-header .group-rgRow,revo-grid:not([theme]) revogr-header .group-rgRow{box-shadow:none}revo-grid[theme=default] revogr-header .group-rgRow .rgHeaderCell,revo-grid:not([theme]) revogr-header .group-rgRow .rgHeaderCell{box-shadow:-1px 0 0 0 var(--revo-grid-header-border), -1px 0 0 0 var(--revo-grid-header-border) inset, 0 -1px 0 0 var(--revo-grid-header-border), 0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] revogr-header .header-rgRow,revo-grid[theme=default] revogr-header .group-rgRow,revo-grid:not([theme]) revogr-header .header-rgRow,revo-grid:not([theme]) revogr-header .group-rgRow{text-transform:uppercase;font-size:12px;color:var(--revo-grid-header-color)}revo-grid[theme=default] revogr-header .header-rgRow,revo-grid:not([theme]) revogr-header .header-rgRow{height:30px;box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] revogr-header .rgHeaderCell,revo-grid:not([theme]) revogr-header .rgHeaderCell{box-shadow:-1px 0 0 0 var(--revo-grid-header-border) inset, 0 -1px 0 0 var(--revo-grid-header-border), 0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] .rowHeaders,revo-grid:not([theme]) .rowHeaders{background-color:var(--revo-grid-header-bg)}revo-grid[theme=default] .rowHeaders revogr-data .rgCell,revo-grid:not([theme]) .rowHeaders revogr-data .rgCell{color:var(--revo-grid-header-color)}revo-grid[theme=default] .rowHeaders revogr-data .rgCell:first-child,revo-grid:not([theme]) .rowHeaders revogr-data .rgCell:first-child{box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] .rowHeaders revogr-data .rgCell:not(:first-child),revo-grid:not([theme]) .rowHeaders revogr-data .rgCell:not(:first-child){box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset, 1px 0 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] .rowHeaders revogr-data .rgCell:last-child,revo-grid:not([theme]) .rowHeaders revogr-data .rgCell:last-child{border-right:1px solid var(--revo-grid-header-border)}revo-grid[theme=default] .rowHeaders revogr-data revogr-header,revo-grid:not([theme]) .rowHeaders revogr-data revogr-header{box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] revogr-viewport-scroll.colPinStart revogr-data .rgRow .rgCell:last-child,revo-grid:not([theme]) revogr-viewport-scroll.colPinStart revogr-data .rgRow .rgCell:last-child{box-shadow:0 -1px 0 0 var(--revo-grid-cell-border) inset, -1px 0 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] revogr-viewport-scroll.colPinStart .footer-wrapper revogr-data .rgRow:first-child .rgCell,revo-grid:not([theme]) revogr-viewport-scroll.colPinStart .footer-wrapper revogr-data .rgRow:first-child .rgCell{box-shadow:0 1px 0 0 var(--revo-grid-header-border) inset, -1px 0 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] revogr-viewport-scroll.colPinEnd,revo-grid[theme=default] revogr-viewport-scroll.colPinEnd revogr-header,revo-grid:not([theme]) revogr-viewport-scroll.colPinEnd,revo-grid:not([theme]) revogr-viewport-scroll.colPinEnd revogr-header{box-shadow:1px 0 0 var(--revo-grid-header-border) inset}revo-grid[theme=default] .footer-wrapper revogr-data .rgRow:first-child .rgCell,revo-grid:not([theme]) .footer-wrapper revogr-data .rgRow:first-child .rgCell{box-shadow:0 1px 0 0 var(--revo-grid-cell-border) inset, -1px 0 0 0 var(--revo-grid-cell-border) inset, 0 -1px 0 0 var(--revo-grid-cell-border) inset}revo-grid[theme=default] revogr-data,revo-grid:not([theme]) revogr-data{text-align:center}revo-grid[theme=default] revogr-data .revo-draggable,revo-grid:not([theme]) revogr-data .revo-draggable{float:left}revo-grid[theme=default] revogr-data .rgRow,revo-grid:not([theme]) revogr-data .rgRow{line-height:27px}revo-grid[theme=default] revogr-data .rgCell,revo-grid:not([theme]) revogr-data .rgCell{box-shadow:0 -1px 0 0 var(--revo-grid-cell-border) inset, -1px 0 0 0 var(--revo-grid-cell-border) inset}revo-grid[theme=material]{font-family:Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}revo-grid[theme=material] revogr-header{line-height:50px;font-weight:600;text-align:left}revo-grid[theme=material] revogr-header .rgHeaderCell{padding:0 15px;text-overflow:ellipsis}revo-grid[theme=material] revogr-header .header-rgRow{height:50px}revo-grid[theme=material] revogr-data{text-align:left}revo-grid[theme=material] revogr-data .rgRow{line-height:42px}revo-grid[theme=material] revogr-data .rgCell{padding:0 15px}revo-grid[theme=darkMaterial]{font-family:Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}revo-grid[theme=darkMaterial] revogr-header{line-height:50px;font-weight:600;text-align:left}revo-grid[theme=darkMaterial] revogr-header .rgHeaderCell{padding:0 15px;text-overflow:ellipsis}revo-grid[theme=darkMaterial] revogr-header .header-rgRow{height:50px}revo-grid[theme=darkMaterial] revogr-data{text-align:left}revo-grid[theme=darkMaterial] revogr-data .rgRow{line-height:42px}revo-grid[theme=darkMaterial] revogr-data .rgCell{padding:0 15px}revo-grid[theme=darkCompact]{font-family:Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}revo-grid[theme=darkCompact] revogr-header{line-height:45px;font-weight:600;text-align:left}revo-grid[theme=darkCompact] revogr-header .rgHeaderCell{padding:0 15px;text-overflow:ellipsis}revo-grid[theme=darkCompact] revogr-header .header-rgRow{height:45px}revo-grid[theme=darkCompact] revogr-data{text-align:left}revo-grid[theme=darkCompact] revogr-data .rgRow{line-height:32px}revo-grid[theme=darkCompact] revogr-data .rgCell{padding:0 15px}revo-grid[theme=compact]{font-family:Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}revo-grid[theme=compact] revogr-header{line-height:45px;font-weight:600;text-align:left}revo-grid[theme=compact] revogr-header .rgHeaderCell{padding:0 15px;text-overflow:ellipsis}revo-grid[theme=compact] revogr-header .header-rgRow{height:45px}revo-grid[theme=compact] revogr-data{text-align:left}revo-grid[theme=compact] revogr-data .rgRow{line-height:32px}revo-grid[theme=compact] revogr-data .rgCell{padding:0 15px}revo-grid[theme=compact] revo-dropdown .rv-dr-root{padding:0px 9px}revo-grid[dir=rtl] .viewports{flex-direction:row-reverse}revo-grid[dir=rtl] revogr-header .rgHeaderCell{text-align:right}revo-grid[dir=rtl] revogr-data .rgCell{text-align:right}revo-grid[dir=rtl] .rowHeaders revogr-data .rgCell{text-align:right}revo-grid[dir=rtl] revogr-filter-panel{direction:rtl}revo-grid[dir=rtl] revo-dropdown .rv-dr-root{text-align:right}revo-grid[dir=rtl] .drag-position{right:0;left:auto}revo-grid[dir=rtl] .drag-auto-scroll-y{right:0;left:auto}revo-grid[dir=rtl] .clipboard{right:0;left:auto}revo-grid[dir=rtl] .draggable{margin-left:-20px;margin-right:0;padding-right:20px;padding-left:5px}revo-grid[dir=rtl] .draggable .revo-alt-icon{right:5px;left:auto}revo-grid[dir=rtl] .focused-cell{border-right:2px solid var(--revo-grid-primary);border-left:none}revo-grid[dir=rtl] .selection-range{border-right:2px solid var(--revo-grid-primary);border-left:none}revo-grid[dir=rtl] .resize-handle{right:0;left:auto}revo-grid[dir=rtl] .sort-indicator{margin-left:0;margin-right:5px}revo-grid[dir=rtl] .filter-button{margin-left:0;margin-right:5px}revo-grid[dir=rtl] .group-expand{margin-right:0;margin-left:2px;padding-right:5px;padding-left:0}revo-grid[dir=rtl] .rgCell,revo-grid[dir=rtl] .rgHeaderCell{padding-left:5px;padding-right:5px}revo-grid[dir=rtl] revogr-edit{direction:rtl}revo-grid[dir=rtl] .rgHeaderCell{direction:rtl}revo-grid[dir=rtl][theme=material] revogr-header,revo-grid[dir=rtl][theme=darkMaterial] revogr-header{text-align:right}revo-grid[dir=rtl][theme=material] revogr-data,revo-grid[dir=rtl][theme=darkMaterial] revogr-data{text-align:right}revo-grid[dir=rtl][theme=default] .rowHeaders,revo-grid[dir=rtl]:not([theme]) .rowHeaders{background-color:var(--revo-grid-header-bg)}revo-grid[dir=rtl][theme=default] .rowHeaders revogr-data .rgCell,revo-grid[dir=rtl]:not([theme]) .rowHeaders revogr-data .rgCell{color:var(--revo-grid-header-color)}revo-grid[dir=rtl][theme=default] .rowHeaders revogr-data .rgCell:first-child,revo-grid[dir=rtl]:not([theme]) .rowHeaders revogr-data .rgCell:first-child{box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[dir=rtl][theme=default] .rowHeaders revogr-data .rgCell:not(:first-child),revo-grid[dir=rtl]:not([theme]) .rowHeaders revogr-data .rgCell:not(:first-child){box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset, 1px 0 0 0 var(--revo-grid-header-border) inset}revo-grid[dir=rtl][theme=default] .rowHeaders revogr-data .rgCell:last-child,revo-grid[dir=rtl]:not([theme]) .rowHeaders revogr-data .rgCell:last-child{border-left:1px solid var(--revo-grid-header-border);border-right:none}revo-grid[dir=rtl][theme=default] .rowHeaders revogr-data revogr-header,revo-grid[dir=rtl]:not([theme]) .rowHeaders revogr-data revogr-header{box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid[dir=rtl][theme=default] revogr-header,revo-grid[dir=rtl]:not([theme]) revogr-header{text-align:right}revo-grid[dir=rtl][theme=default] revogr-data,revo-grid[dir=rtl]:not([theme]) revogr-data{text-align:right}revo-grid[dir=rtl][theme=compact] revogr-header,revo-grid[dir=rtl][theme=darkCompact] revogr-header{text-align:right}revo-grid[dir=rtl][theme=compact] revogr-data,revo-grid[dir=rtl][theme=darkCompact] revogr-data{text-align:right}.revo-drag-icon{width:11px;opacity:0.8}.revo-drag-icon::before{content:"::";display:inline-block}.revo-alt-icon{-webkit-mask-image:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 384 383' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath d='M192.4375,383 C197.424479,383 201.663411,381.254557 205.154297,377.763672 L205.154297,377.763672 L264.25,318.667969 C270.234375,312.683594 271.605794,306.075846 268.364258,298.844727 C265.122721,291.613607 259.51237,287.998047 251.533203,287.998047 L251.533203,287.998047 L213.382812,287.998047 L213.382812,212.445312 L288.935547,212.445312 L288.935547,250.595703 C288.935547,258.57487 292.551107,264.185221 299.782227,267.426758 C307.013346,270.668294 313.621094,269.296875 319.605469,263.3125 L319.605469,263.3125 L378.701172,204.216797 C382.192057,200.725911 383.9375,196.486979 383.9375,191.5 C383.9375,186.513021 382.192057,182.274089 378.701172,178.783203 L378.701172,178.783203 L319.605469,119.6875 C313.621094,114.201823 307.013346,112.955078 299.782227,115.947266 C292.551107,118.939453 288.935547,124.42513 288.935547,132.404297 L288.935547,132.404297 L288.935547,170.554688 L213.382812,170.554688 L213.382812,95.0019531 L251.533203,95.0019531 C259.51237,95.0019531 264.998047,91.3863932 267.990234,84.1552734 C270.982422,76.9241536 269.735677,70.3164062 264.25,64.3320312 L264.25,64.3320312 L205.154297,5.23632812 C201.663411,1.74544271 197.424479,0 192.4375,0 C187.450521,0 183.211589,1.74544271 179.720703,5.23632812 L179.720703,5.23632812 L120.625,64.3320312 C114.640625,70.3164062 113.269206,76.9241536 116.510742,84.1552734 C119.752279,91.3863932 125.36263,95.0019531 133.341797,95.0019531 L133.341797,95.0019531 L171.492188,95.0019531 L171.492188,170.554688 L95.9394531,170.554688 L95.9394531,132.404297 C95.9394531,124.42513 92.3238932,118.814779 85.0927734,115.573242 C77.8616536,112.331706 71.2539062,113.703125 65.2695312,119.6875 L65.2695312,119.6875 L6.17382812,178.783203 C2.68294271,182.274089 0.9375,186.513021 0.9375,191.5 C0.9375,196.486979 2.68294271,200.725911 6.17382812,204.216797 L6.17382812,204.216797 L65.2695312,263.3125 C71.2539062,268.798177 77.8616536,270.044922 85.0927734,267.052734 C92.3238932,264.060547 95.9394531,258.57487 95.9394531,250.595703 L95.9394531,250.595703 L95.9394531,212.445312 L171.492188,212.445312 L171.492188,287.998047 L133.341797,287.998047 C125.36263,287.998047 119.876953,291.613607 116.884766,298.844727 C113.892578,306.075846 115.139323,312.683594 120.625,318.667969 L120.625,318.667969 L179.720703,377.763672 C183.211589,381.254557 187.450521,383 192.4375,383 Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 384 383' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath d='M192.4375,383 C197.424479,383 201.663411,381.254557 205.154297,377.763672 L205.154297,377.763672 L264.25,318.667969 C270.234375,312.683594 271.605794,306.075846 268.364258,298.844727 C265.122721,291.613607 259.51237,287.998047 251.533203,287.998047 L251.533203,287.998047 L213.382812,287.998047 L213.382812,212.445312 L288.935547,212.445312 L288.935547,250.595703 C288.935547,258.57487 292.551107,264.185221 299.782227,267.426758 C307.013346,270.668294 313.621094,269.296875 319.605469,263.3125 L319.605469,263.3125 L378.701172,204.216797 C382.192057,200.725911 383.9375,196.486979 383.9375,191.5 C383.9375,186.513021 382.192057,182.274089 378.701172,178.783203 L378.701172,178.783203 L319.605469,119.6875 C313.621094,114.201823 307.013346,112.955078 299.782227,115.947266 C292.551107,118.939453 288.935547,124.42513 288.935547,132.404297 L288.935547,132.404297 L288.935547,170.554688 L213.382812,170.554688 L213.382812,95.0019531 L251.533203,95.0019531 C259.51237,95.0019531 264.998047,91.3863932 267.990234,84.1552734 C270.982422,76.9241536 269.735677,70.3164062 264.25,64.3320312 L264.25,64.3320312 L205.154297,5.23632812 C201.663411,1.74544271 197.424479,0 192.4375,0 C187.450521,0 183.211589,1.74544271 179.720703,5.23632812 L179.720703,5.23632812 L120.625,64.3320312 C114.640625,70.3164062 113.269206,76.9241536 116.510742,84.1552734 C119.752279,91.3863932 125.36263,95.0019531 133.341797,95.0019531 L133.341797,95.0019531 L171.492188,95.0019531 L171.492188,170.554688 L95.9394531,170.554688 L95.9394531,132.404297 C95.9394531,124.42513 92.3238932,118.814779 85.0927734,115.573242 C77.8616536,112.331706 71.2539062,113.703125 65.2695312,119.6875 L65.2695312,119.6875 L6.17382812,178.783203 C2.68294271,182.274089 0.9375,186.513021 0.9375,191.5 C0.9375,196.486979 2.68294271,200.725911 6.17382812,204.216797 L6.17382812,204.216797 L65.2695312,263.3125 C71.2539062,268.798177 77.8616536,270.044922 85.0927734,267.052734 C92.3238932,264.060547 95.9394531,258.57487 95.9394531,250.595703 L95.9394531,250.595703 L95.9394531,212.445312 L171.492188,212.445312 L171.492188,287.998047 L133.341797,287.998047 C125.36263,287.998047 119.876953,291.613607 116.884766,298.844727 C113.892578,306.075846 115.139323,312.683594 120.625,318.667969 L120.625,318.667969 L179.720703,377.763672 C183.211589,381.254557 187.450521,383 192.4375,383 Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");width:11px;height:11px;background-size:cover;background-repeat:no-repeat}.arrow-down{position:absolute;right:5px;top:0}.arrow-down svg{width:8px;margin-top:5px;margin-left:5px;opacity:0.4}.cell-value-wrapper{margin-right:10px;overflow:hidden;text-overflow:ellipsis}revo-grid{--revo-grid-primary:#266ae8;--revo-grid-primary-transparent:rgba(38, 106, 232, 0.9);--revo-grid-background:#fff;--revo-grid-foreground:black;--revo-grid-divider:gray;--revo-grid-shadow:rgba(0, 0, 0, 0.15);--revo-grid-text:black;--revo-grid-border:rgba(0, 0, 0, 0.2);--revo-grid-filter-panel-bg:#fff;--revo-grid-filter-panel-border:#d9d9d9;--revo-grid-filter-panel-shadow:rgba(0, 0, 0, 0.15);--revo-grid-filter-panel-input-bg:#eaeaeb;--revo-grid-filter-panel-divider:#d9d9d9;--revo-grid-filter-panel-select-border:transparent;--revo-grid-filter-panel-select-border-hover:transparent;--revo-grid-header-bg:#f8f9fa;--revo-grid-header-color:#000;--revo-grid-header-border:#cecece;--revo-grid-cell-border:#e2e3e3;--revo-grid-focused-bg:rgba(233, 234, 237, 0.5);--revo-grid-row-hover:#f1f1f1;--revo-grid-row-headers-bg:#f7faff;--revo-grid-row-headers-color:#757a82;--revo-grid-cell-disabled-bg:rgba(0, 0, 0, 0.07);direction:ltr !important;display:flex !important;height:100%;min-height:300px;font-family:Helvetica, Arial, Sans-Serif, serif;font-size:14px;position:relative;color:var(--revo-grid-text);-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-direction:column;width:100%;height:100%}revo-grid[theme*=dark]{--revo-grid-background:#212529;--revo-grid-foreground:#fff;--revo-grid-text:rgba(255, 255, 255, 0.9);--revo-grid-divider:#505050;--revo-grid-border:rgba(255, 255, 255, 0.2);--revo-grid-filter-panel-bg:#212529;--revo-grid-filter-panel-border:#505050;--revo-grid-filter-panel-input-bg:#343a40;--revo-grid-filter-panel-divider:#505050;--revo-grid-header-bg:#343a40;--revo-grid-header-color:#fff;--revo-grid-header-border:#505050;--revo-grid-cell-border:#424242;--revo-grid-focused-bg:rgba(52, 58, 64, 0.5);--revo-grid-row-hover:rgba(80, 80, 80, 0.5);--revo-grid-row-headers-bg:rgba(52, 58, 64, 0.8);--revo-grid-row-headers-color:rgba(255, 255, 255, 0.8);--revo-grid-cell-disabled-bg:rgba(255, 255, 255, 0.07)}revo-grid revogr-header .header-rgRow.group{box-shadow:0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid revogr-header .header-rgRow:not(.group){box-shadow:0 -1px 0 0 var(--revo-grid-header-border), 0 -1px 0 0 var(--revo-grid-header-border) inset}revo-grid revogr-header .rgHeaderCell.sortable:hover{background-color:var(--revo-grid-row-hover)}revo-grid revogr-header .rgHeaderCell.focused-cell{background:var(--revo-grid-focused-bg)}revo-grid .footer-wrapper revogr-data{box-shadow:0 -1px 0 var(--revo-grid-cell-border)}revo-grid revogr-viewport-scroll.colPinStart{box-shadow:-1px 0 0 var(--revo-grid-cell-border) inset}revo-grid revogr-viewport-scroll.colPinEnd{box-shadow:-1px 0 0 var(--revo-grid-cell-border)}revo-grid revogr-data .rgRow{box-shadow:0 -1px 0 0 var(--revo-grid-cell-border) inset}revo-grid revogr-data .rgRow.focused-rgRow{background-color:var(--revo-grid-focused-bg)}revo-grid revogr-data .rgCell{color:var(--revo-grid-text)}revo-grid revogr-data .rgCell.disabled{background-color:var(--revo-grid-cell-disabled-bg)}revo-grid .attribution{position:absolute;bottom:0;left:0;right:0;z-index:1000;width:0;height:0;border-left:4px solid var(--revo-grid-primary-transparent);border-bottom:4px solid var(--revo-grid-primary-transparent);border-top:4px solid transparent;border-right:4px solid transparent;cursor:pointer}revo-grid .attribution .value{position:absolute;bottom:0;left:0;background-color:var(--revo-grid-background);padding:4px;border-radius:4px;box-shadow:0 1px 10px var(--revo-grid-border);white-space:nowrap;text-decoration:none;color:var(--revo-grid-text);letter-spacing:0.3px;font-size:11px;opacity:0;width:4px;overflow:hidden;transition:opacity 0.5s ease-in-out, width 0.3s ease-in-out}revo-grid .attribution:hover .value{width:63px;opacity:1}revo-grid.column-draggable.column-drag-start:hover,revo-grid.column-draggable.column-drag-start *:hover{cursor:grabbing}revo-grid .footer-wrapper,revo-grid .header-wrapper{width:100%}revo-grid .footer-wrapper revogr-data,revo-grid .header-wrapper revogr-data{z-index:3}revo-grid revo-dropdown{width:100%}revo-grid revo-dropdown .rv-dr-root{max-height:100%}revo-grid revo-dropdown.shrink label{opacity:0}revo-grid .viewports{max-width:100%;display:flex;flex-direction:row;align-items:flex-start;flex-grow:1}revo-grid .main-viewport{flex-grow:1;height:0;display:flex;justify-content:space-between;flex-direction:row}revo-grid .draggable{position:fixed;height:30px;line-height:30px;background:var(--revo-grid-background);border-radius:3px;display:block;z-index:100;margin-top:5px;margin-right:-20px;box-shadow:0 4px 20px 0 var(--revo-grid-shadow);padding-left:20px;padding-right:5px}revo-grid .draggable.hidden{display:none}revo-grid .draggable .revo-alt-icon{background-color:var(--revo-grid-foreground);position:absolute;left:5px;top:10px}revo-grid .draggable-wrapper.hidden{display:none}revo-grid .drag-position{position:absolute;left:0;right:0;height:1px;z-index:2;background:var(--revo-grid-divider);pointer-events:none}revo-grid .drag-position-y{position:absolute;top:0;left:0;bottom:0;width:1px;z-index:2;background:var(--revo-grid-divider);pointer-events:none}revo-grid .drag-auto-scroll-y{pointer-events:none;position:absolute;left:0;top:0;height:50px;width:1px}revo-grid .clipboard{position:absolute;left:0;top:0}revo-grid revogr-scroll-virtual{position:relative}revo-grid revogr-scroll-virtual.vertical,revo-grid revogr-scroll-virtual.horizontal{z-index:3}`;
  }
}, [260, "revo-grid", { rowHeaders: [4, "row-headers"], frameSize: [2, "frame-size"], rowSize: [2, "row-size"], colSize: [2, "col-size"], range: [4], readonly: [4], resize: [4], noHorizontalScrollTransfer: [4, "no-horizontal-scroll-transfer"], canFocus: [4, "can-focus"], useClipboard: [4, "use-clipboard"], columns: [16], source: [16], pinnedTopSource: [16], pinnedBottomSource: [16], rowDefinitions: [16], editors: [16], applyOnClose: [4, "apply-on-close"], plugins: [16], columnTypes: [16], theme: [1537], rowClass: [513, "row-class"], autoSizeColumn: [4, "auto-size-column"], filter: [4], sorting: [16], focusTemplate: [16], canMoveColumns: [4, "can-move-columns"], trimmedRows: [16], exporting: [4], grouping: [16], stretch: [8], additionalData: [16], disableVirtualX: [4, "disable-virtual-x"], virtualX: [16], disableVirtualY: [4, "disable-virtual-y"], hideAttribution: [4, "hide-attribution"], jobsBeforeRender: [16], registerVNode: [16], accessible: [4], rtl: [4], canDrag: [4, "can-drag"], refresh: [64], setDataAt: [64], scrollToRow: [64], scrollToColumnIndex: [64], scrollToColumnProp: [64], updateColumns: [64], addTrimmed: [64], scrollToCoordinate: [64], setCellEdit: [64], setCellsFocus: [64], getSource: [64], getVisibleSource: [64], getSourceStore: [64], getColumnStore: [64], updateColumnSorting: [64], clearSorting: [64], getColumns: [64], clearFocus: [64], getPlugins: [64], getFocused: [64], getContentSize: [64], getSelectedRange: [64], refreshExtraElements: [64], getProviders: [64] }, [[5, "touchstart", "mousedownHandle"], [5, "mousedown", "mousedownHandle"], [5, "touchend", "mouseupHandle"], [5, "mouseup", "mouseupHandle"], [0, "rowdragstartinit", "onRowDragStarted"], [0, "rowdragendinit", "onRowDragEnd"], [0, "roworderchange", "onRowOrderChange"], [0, "rowdragmoveinit", "onRowDrag"], [0, "rowdragmousemove", "onRowMouseMove"], [0, "celleditapply", "onCellEdit"], [0, "rangeeditapply", "onRangeEdit"], [0, "selectionchangeinit", "onRangeChanged"], [0, "rowdropinit", "onRowDropped"], [0, "beforeheaderclick", "onHeaderClick"], [0, "beforecellfocusinit", "onCellFocus"]], { columnTypes: [{ columnTypesChanged: 0 }], columns: [{ columnChanged: 0 }], disableVirtualX: [{ disableVirtualXChanged: 0 }], virtualX: [{ virtualXChanged: 0 }], rowSize: [{ rowSizeChanged: 0 }], theme: [{ themeChanged: 0 }], source: [{ dataSourceChanged: 0 }], pinnedBottomSource: [{ dataSourceChanged: 0 }], pinnedTopSource: [{ dataSourceChanged: 0 }], disableVirtualY: [{ disableVirtualYChanged: 0 }], rowDefinitions: [{ rowDefChanged: 0 }], trimmedRows: [{ trimmedRowsChanged: 0 }], grouping: [{ groupingChanged: 0 }], stretch: [{ applyStretch: 0 }], filter: [{ applyFilter: 0 }], sorting: [{ applySorting: 0 }], rowHeaders: [{ rowHeadersChange: 0 }], registerVNode: [{ registerOutsideVNodes: 0 }], additionalData: [{ additionalDataChanged: 0 }], rtl: [{ rtlChanged: 0 }], plugins: [{ pluginsChanged: 0 }] }]), Hd = function() {
  typeof customElements < "u" && ["revo-grid", "revogr-attribution", "revogr-clipboard", "revogr-data", "revogr-edit", "revogr-extra", "revogr-focus", "revogr-header", "revogr-order-editor", "revogr-overlay-selection", "revogr-row-headers", "revogr-scroll-virtual", "revogr-temp-range", "revogr-viewport-scroll", "vnode-html"].forEach(((t) => {
    switch (t) {
      case "revo-grid":
        customElements.get(t) || customElements.define(t, Ad);
        break;
      case "revogr-attribution":
        customElements.get(t) || vc();
        break;
      case "revogr-clipboard":
        customElements.get(t) || _s();
        break;
      case "revogr-data":
        customElements.get(t) || xs();
        break;
      case "revogr-edit":
        customElements.get(t) || Ns();
        break;
      case "revogr-extra":
        customElements.get(t) || Bs();
        break;
      case "revogr-focus":
        customElements.get(t) || Ec();
        break;
      case "revogr-header":
        customElements.get(t) || zs();
        break;
      case "revogr-order-editor":
        customElements.get(t) || Ws();
        break;
      case "revogr-overlay-selection":
        customElements.get(t) || Fc();
        break;
      case "revogr-row-headers":
        customElements.get(t) || gc();
        break;
      case "revogr-scroll-virtual":
        customElements.get(t) || Ac();
        break;
      case "revogr-temp-range":
        customElements.get(t) || Mc();
        break;
      case "revogr-viewport-scroll":
        customElements.get(t) || Ss();
        break;
      case "vnode-html":
        customElements.get(t) || Ur();
    }
  }));
};
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t) {
  let e = this;
  do {
    if (Element.prototype.matches.call(e, t)) return e;
    e = e.parentElement || e.parentNode;
  } while (e !== null && e.nodeType === 1);
  return null;
});
const co = "text/revogrid-filter-id";
function ho(t, e, r) {
  if (e === r) return !1;
  const i = t.findIndex(((l) => l.id === e)), o = t.findIndex(((l) => l.id === r));
  if (i === -1 || o === -1 || i === o) return !1;
  const s = t.map(((l) => {
    var a;
    return (a = l.relation) !== null && a !== void 0 ? a : "and";
  })), [n] = t.splice(i, 1);
  return t.splice(o, 0, n), t.forEach(((l, a) => {
    var c;
    l.relation = a === t.length - 1 ? "and" : (c = s[a]) !== null && c !== void 0 ? c : "and";
  })), !0;
}
const W = "none", uo = "add-filter", Md = I(class extends L {
  constructor(t) {
    super(), t !== !1 && this.__registerHost(), this.filterChange = m(this, "filterChange", 7), this.resetChange = m(this, "resetChange", 7), this.filterCaptionsInternal = { title: "Filter by", ok: "Close", save: "Save", reset: "Reset", cancel: "Cancel", add: "Add condition", placeholder: "Enter value...", and: "and", or: "or", filterCondition: "Filter condition", removeFilter: "Remove filter", reorderFilter: "Reorder filter" }, this.isFilterIdSet = !1, this.filterId = 0, this.currentFilterId = -1, this.currentFilterType = W, this.filterItems = {}, this.filterNames = {}, this.filterEntities = {}, this.disableDynamicFiltering = !1, this.closeOnOutsideClick = !0, this.debouncedApplyFilter = Ce((() => {
      this.filterChange.emit(this.filterItems);
    }), 400);
  }
  onMouseDown(t) {
    if (!this.changes) return;
    const e = t.composedPath(), r = this.getAddFilterSelect();
    if (r instanceof HTMLSelectElement) {
      if (e.includes(r)) return;
      r.value = W;
    }
    this.currentFilterType = W, this.changes && (this.changes.type = W), this.currentFilterId = -1, !e.includes(this.element) && !this.isOwnFilterButton(t.target) && this.closeOnOutsideClick && (this.changes = void 0);
  }
  async show(t) {
    this.changes = t, this.filterItems = t?.filterItems || {}, this.changes && (this.changes.type = this.changes.type || W);
  }
  async getChanges() {
    return this.changes;
  }
  componentWillRender() {
    if (!this.isFilterIdSet) {
      this.isFilterIdSet = !0;
      const t = Object.keys(this.filterItems);
      for (const e of t) this.filterId += this.filterItems[e].length;
    }
  }
  getFilterItemsList() {
    var t, e;
    const r = (t = this.changes) === null || t === void 0 ? void 0 : t.prop;
    if (r === void 0) return "";
    const i = (e = this.filterItems[r]) !== null && e !== void 0 ? e : [], o = i.filter(((n) => !n.hidden)).length, s = Object.assign(Object.assign({}, this.filterCaptionsInternal), this.filterCaptions);
    return f("div", { key: this.filterId }, f("ul", { class: "multi-filter-list-container" }, i.map(((n, l) => {
      let a;
      if (n.hidden) return;
      l !== this.filterItems[r].length - 1 && (a = f(Ja, { text: n.relation === "and" ? s.and : s.or, onClick: () => this.toggleFilterAndOr(n.id) }));
      const c = this.renderExtra(r, l), d = this.draggedFilterId === n.id, h = this.dragOverFilterId === n.id && !d, u = o > 1;
      return f("li", { key: n.id, class: "multi-filter-list", "aria-label": `${s.filterCondition} ${l + 1}` }, f("div", { class: { "multi-filter-list-row": !0, "filter-row-drop-active": this.draggedFilterId !== void 0 && !d, "filter-row-dragging": d, "filter-row-drag-over": h } }, u ? f("button", { type: "button", class: "filter-row-drop-target", tabIndex: -1, "aria-label": `${s.filterCondition} ${l + 1}`, onDragOver: (g) => this.onFilterDragOver(g, n.id), onDragLeave: () => this.onFilterDragLeave(n.id), onDrop: (g) => this.onFilterDrop(g, r, n.id) }) : "", u ? f(Za, { ariaLabel: s.reorderFilter, dragging: d, dragOver: h, onDragStart: (g) => this.onFilterDragStart(g, n.id), onDragEnd: () => this.onFilterDragEnd(), onKeyDown: (g) => this.onFilterReorderKeyDown(g, r, n.id) }) : "", f("div", { class: { "select-input": !0 } }, f("select", { class: "select-css select-filter", onChange: (g) => this.onFilterTypeChange(g, r, l) }, this.renderSelectOptions(this.filterItems[r][l].type, !0)), c ? f("div", { class: "filter-extra" }, c) : ""), f("div", { class: "multi-filter-list-action" }, a, f(qa, { ariaLabel: s.removeFilter, onClick: () => this.onRemoveFilter(n.id) }))));
    }))), i.filter(((n) => !n.hidden)).length > 0 ? f("div", { class: "add-filter-divider" }) : "");
  }
  componentDidRender() {
    this.syncDialog();
  }
  syncDialog() {
    this.dialog && (this.changes ? (this.dialog.open || this.dialog.show(), this.changes.autoCorrect !== !1 && (this.autoCorrect(this.dialog), requestAnimationFrame((() => this.autoCorrect(this.dialog))))) : this.dialog.open && this.dialog.close());
  }
  autoCorrect(t) {
    var e;
    if (!t || !this.changes) return;
    t.style.maxHeight = "", t.style.left = this.changes.x + "px", t.style.top = this.changes.y + "px";
    const r = t.getBoundingClientRect(), i = (e = this.changes.anchorY) !== null && e !== void 0 ? e : this.changes.y, o = this.changes.y, s = Math.max(0, i - 8), n = Math.max(0, window.innerHeight - o - 8), l = r.height > n && s > n;
    t.style.maxHeight = Math.max(8, l ? s : n) + "px";
    const a = t.getBoundingClientRect(), c = Math.max(8, window.innerWidth - a.width - 8), d = Math.max(8, window.innerHeight - a.height - 8), h = Math.min(Math.max(8, this.changes.x), c), u = Math.min(Math.max(8, l ? i - a.height : o), d);
    t.style.left = h + "px", t.style.top = u + "px";
  }
  onFilterTypeChange(t, e, r) {
    t.target instanceof HTMLSelectElement && (this.filterItems[e][r].type = t.target.value, this.filterId++, setTimeout((() => {
      const i = document.getElementById("filter-input-" + this.filterItems[e][r].id);
      i instanceof HTMLInputElement && i.focus();
    }), 0), this.disableDynamicFiltering || this.debouncedApplyFilter());
  }
  onAddNewFilter(t) {
    this.currentFilterType = t.target.value, this.addNewFilterToProp();
    const e = this.getAddFilterSelect();
    e && (e.value = W, this.currentFilterType = W), this.disableDynamicFiltering || this.debouncedApplyFilter();
  }
  addNewFilterToProp() {
    var t;
    const e = (t = this.changes) === null || t === void 0 ? void 0 : t.prop;
    (e || e === 0) && (this.filterItems[e] || (this.filterItems[e] = []), this.currentFilterType !== "none" && (this.filterId++, this.currentFilterId = this.filterId, this.filterItems[e].push({ id: this.currentFilterId, type: this.currentFilterType, value: "", relation: "and" }), setTimeout((() => {
      const r = document.getElementById("filter-input-" + this.currentFilterId);
      r && r.focus();
    }), 0)));
  }
  onSave() {
    this.filterChange.emit(this.filterItems);
  }
  onCancel() {
    this.changes = void 0;
  }
  onReset() {
    var t;
    this.assertChanges(), this.resetChange.emit((t = this.changes) === null || t === void 0 ? void 0 : t.prop), this.filterId++;
  }
  onRemoveFilter(t) {
    var e;
    this.assertChanges(), this.filterId++;
    const r = (e = this.changes) === null || e === void 0 ? void 0 : e.prop, i = this.filterItems[r ?? ""];
    if (!i) return;
    const o = i.findIndex(((s) => s.id === t));
    o !== -1 && (i.splice(o, 1), i.length === 0 && delete this.filterItems[r ?? ""], this.disableDynamicFiltering || this.debouncedApplyFilter());
  }
  onFilterDragStart(t, e) {
    this.draggedFilterId = e, (function(r, i) {
      r && (r.effectAllowed = "move", r.setData(co, i + ""), r.setData("text/plain", i + ""));
    })(t.dataTransfer, e);
  }
  onFilterDragOver(t, e) {
    this.draggedFilterId !== void 0 && this.draggedFilterId !== e && (t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), this.dragOverFilterId = e);
  }
  onFilterDragLeave(t) {
    this.dragOverFilterId === t && (this.dragOverFilterId = void 0);
  }
  onFilterDrop(t, e, r) {
    var i;
    t.preventDefault();
    const o = (i = this.draggedFilterId) !== null && i !== void 0 ? i : (function(n) {
      if (!n) return;
      const l = (n.getData(co) || n.getData("text/plain")).trim();
      if (!l) return;
      const a = Number(l);
      return Number.isFinite(a) ? a : void 0;
    })(t.dataTransfer);
    if (this.onFilterDragEnd(), o === void 0) return;
    const s = this.filterItems[e];
    s && ho(s, o, r) && (this.filterId++, this.disableDynamicFiltering || this.debouncedApplyFilter());
  }
  onFilterDragEnd() {
    this.draggedFilterId = void 0, this.dragOverFilterId = void 0;
  }
  onFilterReorderKeyDown(t, e, r) {
    let i = 0;
    if (t.key === "ArrowUp") i = -1;
    else {
      if (t.key !== "ArrowDown") return;
      i = 1;
    }
    const o = this.filterItems[e];
    if (!o) return;
    const s = o.filter(((a) => !a.hidden)), n = s.findIndex(((a) => a.id === r));
    if (n === -1) return;
    t.preventDefault(), t.stopPropagation();
    const l = s[n + i];
    l && ho(o, r, l.id) && (this.filterId++, this.disableDynamicFiltering || this.debouncedApplyFilter());
  }
  toggleFilterAndOr(t) {
    var e;
    this.assertChanges(), this.filterId++;
    const r = (e = this.changes) === null || e === void 0 ? void 0 : e.prop, i = this.filterItems[r ?? ""];
    if (!i) return;
    const o = i.findIndex(((s) => s.id === t));
    o !== -1 && (i[o].relation = i[o].relation === "and" ? "or" : "and", this.disableDynamicFiltering || this.debouncedApplyFilter());
  }
  assertChanges() {
    if (!this.changes) throw Error("Changes required per edit");
  }
  renderSelectOptions(t, e = !1) {
    if (!this.changes) return;
    const r = [], i = this.changes.prop, o = /* @__PURE__ */ new Set();
    if (Object.keys(this.filterItems).forEach(((s) => {
      this.filterItems[s].forEach(((n) => {
        n.hidden && o.add(n.type);
      }));
    })), !e) {
      const s = Object.assign(Object.assign({}, this.filterCaptionsInternal), this.filterCaptions);
      r.push(f("option", { selected: this.currentFilterType === W, value: W }, i && this.filterItems[i] && this.filterItems[i].length > 0 ? s.add : this.filterNames[W]));
    }
    for (let s in this.changes.filterTypes) {
      const n = this.changes.filterTypes[s].filter(((l) => !o.has(l)));
      n.length && (r.push(...n.map(((l) => f("option", { value: l, selected: t === l }, this.filterNames[l])))), r.push(f("option", { disabled: !0 })));
    }
    return r;
  }
  renderExtra(t, e) {
    const r = this.filterItems[t];
    if (!r) return "";
    const i = (l) => {
      this.filterItems[t][e].value = l, this.disableDynamicFiltering || this.debouncedApplyFilter();
    }, o = () => {
      const l = this.getAddFilterSelect();
      l && (l.value = W, this.currentFilterType = W, this.addNewFilterToProp(), l.focus());
    }, s = Object.assign(Object.assign({}, this.filterCaptionsInternal), this.filterCaptions), n = this.filterEntities[r[e].type].extra;
    return typeof n == "function" ? n(f, { value: r[e].value, filter: r[e], prop: t, index: e, placeholder: s.placeholder, onInput: (l) => {
      i(l);
    }, onFocus: () => {
      o();
    } }) : n !== "input" && n !== "datepicker" ? "" : f("input", { id: "filter-input-" + r[e].id, placeholder: s.placeholder, type: n === "datepicker" ? "date" : "text", value: r[e].value, onInput: (l) => {
      l.target instanceof HTMLInputElement && i(l.target.value);
    }, onKeyDown: (l) => {
      l.key.toLowerCase() !== "enter" ? l.stopPropagation() : this.getAddFilterSelect() && o();
    } });
  }
  getAddFilterSelect() {
    return this.element.querySelector("#" + uo);
  }
  isOwnFilterButton(t) {
    if (!(t instanceof Element) || !$s(t)) return !1;
    const e = this.getOwningGrid(this.element), r = this.getOwningGrid(t);
    return !!e && e === r;
  }
  getOwningGrid(t) {
    const e = t.closest("revo-grid");
    if (e) return e;
    const r = t.getRootNode();
    return r instanceof ShadowRoot && r.host.localName === "revo-grid" ? r.host : void 0;
  }
  render() {
    var t, e, r, i, o, s, n, l, a;
    const c = { left: ((e = (t = this.changes) === null || t === void 0 ? void 0 : t.x) !== null && e !== void 0 ? e : 0) + "px", top: ((i = (r = this.changes) === null || r === void 0 ? void 0 : r.y) !== null && i !== void 0 ? i : 0) + "px" }, d = Object.assign(Object.assign({}, this.filterCaptionsInternal), this.filterCaptions);
    return f(M, { key: "2a19b35adb56fb7d23385fffebc768838edee162" }, f("dialog", { key: "94386d7cbc4bd9c631f72928938b1d1550a3de82", class: "filter-panel-dialog", style: c, ref: (h) => this.dialog = h, onCancel: (h) => {
      h.preventDefault(), this.onCancel();
    } }, this.changes && [f("slot", { key: "header-slot", slot: "header" }), ((s = (o = this.changes).extraContent) === null || s === void 0 ? void 0 : s.call(o, this.changes)) || "", ((n = this.changes) === null || n === void 0 ? void 0 : n.hideDefaultFilters) !== !0 && [f("label", { key: "filter-title" }, d.title), f("div", { key: "filter-holder", class: "filter-holder" }, this.getFilterItemsList()), f("div", { key: "add-filter", class: "add-filter" }, f("select", { key: "4f7354e39d8e5cf9ae7b735290eff18d105ab87e", id: uo, class: "select-css", onChange: (h) => this.onAddNewFilter(h) }, this.renderSelectOptions(this.currentFilterType)))], f("slot", { key: "default-slot" }), ((a = (l = this.changes).extraBottomContent) === null || a === void 0 ? void 0 : a.call(l, this.changes)) || "", f("div", { key: "filter-actions", class: "filter-actions" }, this.disableDynamicFiltering && [f("button", { key: "save", id: "revo-button-save", "aria-label": "save", class: "revo-button green", onClick: () => this.onSave() }, d.save), f("button", { key: "cancel", id: "revo-button-ok", "aria-label": "ok", class: "revo-button green", onClick: () => this.onCancel() }, d.cancel)], !this.disableDynamicFiltering && [f("button", { key: "ok", id: "revo-button-ok", "aria-label": "ok", class: "revo-button green", onClick: () => this.onCancel() }, d.ok), f("button", { key: "reset", id: "revo-button-reset", "aria-label": "reset", class: "revo-button outline", onClick: () => this.onReset() }, d.reset)]), f("slot", { key: "footer-slot", slot: "footer" })]));
  }
  get element() {
    return this;
  }
  static get style() {
    return '.revo-button{position:relative;overflow:hidden;color:#fff;background-color:#4545ff;height:32px;line-height:32px;padding:0 15px;outline:0;border:0;border-radius:7px;box-sizing:border-box;cursor:pointer}.revo-button.green{background-color:#009037}.revo-button.red{background-color:#E0662E}.revo-button:disabled,.revo-button[disabled]{cursor:not-allowed !important;filter:opacity(0.35) !important}.revo-button.outline{border:1px solid #dbdbdb;line-height:30px;background:none;color:#000;box-shadow:none}revo-grid[theme^=dark] .revo-button.outline{border:1px solid #404040;color:#d8d8d8}revogr-filter-panel{display:block}revogr-filter-panel .filter-panel-dialog{position:fixed;top:0;left:0;z-index:100;max-height:calc(100vh - 16px);overflow:auto;opacity:1;transform:none;background-color:var(--revo-grid-filter-panel-bg, #fff);border:1px solid var(--revo-grid-filter-panel-border, #cecece);transform-origin:62px 0px;box-shadow:0 5px 18px -2px var(--revo-grid-filter-panel-shadow, rgba(0, 0, 0, 0.15));box-sizing:border-box;padding:10px;border-radius:8px;margin:0;min-width:220px;text-align:left;animation:revogr-filter-panel-open 140ms cubic-bezier(0.2, 0, 0, 1)}revogr-filter-panel .filter-panel-dialog .filter-holder>div{display:flex;flex-direction:column}revogr-filter-panel .filter-panel-dialog label{font-size:13px;display:block;padding:8px 0}revogr-filter-panel .filter-panel-dialog select{width:100%}revogr-filter-panel .filter-panel-dialog input[type=text]{border:0;min-height:34px;margin:5px 0;background:var(--revo-grid-filter-panel-input-bg, #f3f3f3);border-radius:5px;padding:0 10px;box-sizing:border-box;width:100%}revogr-filter-panel .filter-panel-dialog .filter-actions{position:sticky;right:0;bottom:-10px;left:0;z-index:1;text-align:right;margin:10px -10px -10px;padding:0 5px 10px 10px;background:var(--revo-grid-filter-panel-bg, #fff);border-top:1px solid var(--revo-grid-filter-panel-divider, #d9d9d9)}revogr-filter-panel .filter-panel-dialog .filter-actions button{margin-top:10px;margin-right:5px}@keyframes revogr-filter-panel-open{from{opacity:0;transform:translateY(-4px) scale(0.98)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){revogr-filter-panel .filter-panel-dialog{animation:none}}.rgHeaderCell:hover .rv-filter{transition:opacity 267ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 178ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.rgHeaderCell:hover .rv-filter,.rgHeaderCell .rv-filter.active{opacity:1}.rgHeaderCell .rv-filter{height:24px;width:24px;background:none;border:0;opacity:0;visibility:visible;cursor:pointer;border-radius:4px}.rgHeaderCell .rv-filter.active{color:#10224a}.rgHeaderCell .rv-filter .filter-img{color:gray;width:11px}.select-css{display:block;font-family:sans-serif;line-height:1.3;padding:0.6em 1.4em 0.5em 0.8em;width:100%;max-width:100%;box-sizing:border-box;margin:0;border:1px solid var(--revo-grid-filter-panel-select-border, #d9d9d9);box-shadow:transparent;border-radius:0.5em;appearance:none;background-color:var(--revo-grid-filter-panel-input-bg, #f3f3f3);background-image:url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");background-repeat:no-repeat, repeat;background-position:right 0.7em top 50%, 0 0;background-size:0.65em auto, 100%;}.select-css::-ms-expand{display:none}.select-css:hover{border-color:var(--revo-grid-filter-panel-select-border, #d9d9d9)}.select-css:focus{border-color:var(--revo-grid-filter-panel-select-border-hover, #d9d9d9);box-shadow:0 0 1px 3px rgba(59, 153, 252, 0.7);box-shadow:0 0 0 3px -moz-mac-focusring;outline:none}.select-css option{font-weight:normal}.select-css:disabled,.select-css[aria-disabled=true]{color:gray;background-image:url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"), linear-gradient(to bottom, #ffffff 0%, #ffffff 100%)}.select-css:disabled:hover,.select-css[aria-disabled=true]{border-color:var(--revo-grid-filter-panel-select-border, #d9d9d9)}.multi-filter-list{margin-top:5px;margin-bottom:5px}.multi-filter-list div{white-space:nowrap}.multi-filter-list .multi-filter-list-row{display:flex;align-items:center;gap:6px;position:relative}.multi-filter-list .multi-filter-list-row.filter-row-dragging{opacity:0.65}.multi-filter-list .multi-filter-list-row.filter-row-drag-over::before{content:"";position:absolute;top:-4px;right:0;left:0;z-index:2;height:2px;background:var(--revo-grid-filter-panel-reorder-accent, #007cb2);border-radius:999px;box-shadow:0 0 0 2px var(--revo-grid-filter-panel-bg, #fff)}.multi-filter-list .multi-filter-list-row.filter-row-drop-active .filter-row-drop-target{pointer-events:auto}.multi-filter-list .filter-row-drop-target{position:absolute;inset:0;z-index:1;padding:0;pointer-events:none;background:transparent;border:0}.multi-filter-list .multi-filter-list-action{display:flex;align-self:stretch;flex:0 0 auto;justify-content:flex-end;align-items:center}.multi-filter-list .and-or-button{margin:0 0 0 10px;min-width:58px;cursor:pointer}.multi-filter-list .trash-button{margin:0 0 -2px 6px;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;width:22px;height:100%;font-size:16px}.multi-filter-list .trash-button .trash-img{width:1em}.multi-filter-list .reorder-button{border:0;background:transparent;color:var(--revo-grid-filter-panel-reorder-color, #6b7280);cursor:grab;font-family:monospace;font-size:12px;letter-spacing:0;line-height:1;padding:6px 2px;transform:scaleX(0.8);width:16px}.multi-filter-list .reorder-button.filter-row-drag-over{color:var(--revo-grid-filter-panel-reorder-accent, #007cb2)}.multi-filter-list .reorder-button:active{cursor:grabbing}.multi-filter-list-container{padding:0;margin:0;list-style:none}.add-filter-divider{display:block;margin:0 -10px 10px -10px;border-bottom:1px solid var(--revo-grid-filter-panel-divider, #d9d9d9);height:10px}.select-input{display:flex;align-items:center;flex:1 1 auto;gap:6px;min-width:0}.select-input .select-filter,.select-input .filter-extra{flex:1 1 0;min-width:0}.select-input .select-filter{width:auto}.select-input .filter-extra{display:flex}.select-input .filter-extra>*{width:100%}.select-input input[type=text],.select-input input[type=date]{margin:0}';
  }
}, [260, "revogr-filter-panel", { filterNames: [16], filterEntities: [16], filterCaptions: [16], disableDynamicFiltering: [4, "disable-dynamic-filtering"], closeOnOutsideClick: [4, "close-on-outside-click"], isFilterIdSet: [32], filterId: [32], currentFilterId: [32], currentFilterType: [32], changes: [32], filterItems: [32], draggedFilterId: [32], dragOverFilterId: [32], show: [64], getChanges: [64] }, [[5, "mousedown", "onMouseDown"]]]), Nd = function() {
  typeof customElements < "u" && ["revogr-filter-panel"].forEach(((t) => {
    t === "revogr-filter-panel" && (customElements.get(t) || customElements.define(t, Md));
  }));
};
function Bd() {
  Nd(), Hd();
}
typeof customElements < "u" && Bd();
const go = Object.freeze(["accessible", "additionalData", "applyOnClose", "autoSizeColumn", "canDrag", "canFocus", "canMoveColumns", "colSize", "columns", "columnTypes", "disableVirtualX", "disableVirtualY", "exporting", "filter", "frameSize", "grouping", "hideAttribution", "noHorizontalScrollTransfer", "pinnedBottomSource", "pinnedTopSource", "range", "readonly", "resize", "rowClass", "rowDefinitions", "rowHeaders", "rowSize", "rtl", "sorting", "source", "stretch", "theme", "trimmedRows", "useClipboard", "virtualX"]), po = Object.freeze({
  aftercolumnresize: "aftercolumnresize",
  afteredit: "afteredit",
  afterfocus: "afterfocus",
  aftersortingapply: "aftersortingapply",
  beforefilterapply: "beforefilterapply",
  headerclick: "headerclick",
  roworderchanged: "roworderchanged"
}), qr = en(function(e, r) {
  const i = We(null), o = We(null), s = We({}), n = We(null), l = We(0);
  if (!o.current && typeof document < "u") {
    const a = document.createElement("revo-grid");
    a.style.display = "block", a.style.width = "100%", a.style.height = "100%", ti(
      a,
      go,
      e,
      s.current
    ), o.current = a;
  }
  return tn(r, () => o.current, []), At(() => {
    const a = o.current;
    if (!a)
      return;
    ti(
      a,
      go,
      e,
      s.current,
      n.current
    ).sourceSyncConsumed && (n.current = null);
  }), At(() => {
    const a = o.current;
    if (!a)
      return;
    const c = {};
    for (const [g, p] of Object.entries(po))
      c[g] = (v) => {
        l.current += 1;
        const y = g === "afteredit" ? on(v.detail) : v.detail, w = ei(
          g,
          y,
          l.current
        ), x = { [p]: w };
        if (g === "afteredit" && e.syncSourceOnEdit && "source" in a) {
          const S = sn(a.source);
          n.current = S, x.source = S.value;
        }
        e.setProps && e.setProps(x);
      };
    const d = {};
    for (const g of ln(e.eventListeners))
      g in po || (d[g] = (p) => {
        l.current += 1, e.setProps && e.setProps({
          eventData: ei(
            g,
            p.detail,
            l.current
          )
        });
      });
    const h = ri(a, c), u = ri(a, d);
    return () => {
      h(), u();
    };
  }, [
    e.eventListeners,
    e.setProps,
    e.syncSourceOnEdit
  ]), At(() => {
    const a = i.current, c = o.current;
    if (!(!a || !c))
      return a.appendChild(c), () => c.remove();
  }, []), Qs.createElement("div", {
    ref: i,
    id: e.id,
    className: e.className,
    style: {
      display: "block",
      width: "100%",
      ...e.style
    }
  });
});
qr.displayName = "RevoGrid";
qr.propTypes = {
  /** Dash component identifier. */
  id: C.string,
  /** CSS class applied to the RevoGrid component host. */
  className: C.string,
  /** Inline style applied to the RevoGrid component host. */
  style: C.object,
  /** Enable accessibility. If disabled, the grid will not be accessible. */
  accessible: C.bool,
  /** Additional data to be passed to plugins, renders or editors. For example if you need to pass Vue component instance. */
  additionalData: C.any,
  /** Apply changes in editor when closed except 'Escape' cases. If custom editor in use method getValue required. Check interfaces.d.ts `EditorBase` for more info. */
  applyOnClose: C.bool,
  /** Autosize config. Enables columns autoSize. For more details check `autoSizeColumn` plugin. By default disabled, hence operation is not performance efficient. `true` to enable with default params (double header separator click for autosize). Or define config. See `AutoSizeColumnConfig` for more details. */
  autoSizeColumn: C.bool,
  /** Disable native drag&drop plugin. */
  canDrag: C.bool,
  /** When true cell focus appear. */
  canFocus: C.bool,
  /** Enable column move plugin. */
  canMoveColumns: C.bool,
  /** Indicates default column size. */
  colSize: C.number,
  /** Columns - defines an array of grid columns. Can be column or grouped column. */
  columns: C.array,
  /** Column Types Format. Every type represent multiple column properties. Types will be merged but can be replaced with column properties. Types were made as separate objects to be reusable per multiple columns. */
  columnTypes: C.object,
  /** Disable lazy rendering mode for the `X axis`. Use when not many columns present and you don't need rerenader cells during scroll. Can be used for initial rendering performance improvement. */
  disableVirtualX: C.bool,
  /** Disable lazy rendering mode for the `Y axis`. Use when not many rows present and you don't need rerenader cells during scroll. Can be used for initial rendering performance improvement. */
  disableVirtualY: C.bool,
  /** Enable export plugin. */
  exporting: C.bool,
  /** Enables filter plugin. Can be boolean. Or can be filter collection See `FilterCollection` for more info. */
  filter: C.bool,
  /** Defines how many rows/columns should be rendered outside visible area. */
  frameSize: C.number,
  /** Group rows based on this property. Define properties to be groped by grouping plugin See `GroupingOptions`. */
  grouping: C.object,
  /** Please only hide the attribution if you are subscribed to Pro version */
  hideAttribution: C.bool,
  /** Prevents horizontal scroll state from being mirrored across viewport sections. */
  noHorizontalScrollTransfer: C.bool,
  /** Pinned bottom Source: {[T in ColumnProp]: any} - defines pinned bottom rows data source. */
  pinnedBottomSource: C.array,
  /** Pinned top Source: {[T in ColumnProp]: any} - defines pinned top rows data source. */
  pinnedTopSource: C.array,
  /** When true, user can select a cell range. Required for range-based clipboard fill. */
  range: C.bool,
  /** When true, grid in read only mode. */
  readonly: C.bool,
  /** When true, columns are resizable. */
  resize: C.bool,
  /** Row class property mapping. Map custom classes to rows from row object data. Define this property in rgRow object and this will be mapped as rgRow class. */
  rowClass: C.string,
  /** Custom row properies to be applied. See `RowDefinition` for more info. */
  rowDefinitions: C.array,
  /** Excel like functionality. Show row numbers. Also can be used for custom row header render if object provided. */
  rowHeaders: C.bool,
  /** Indicates default rgRow size. By default 0, means theme package size will be applied Alternatively you can use `rowSize` to reset viewport */
  rowSize: C.number,
  /** Enable right-to-left (RTL) mode. When enabled, columns will be displayed from right to left. */
  rtl: C.bool,
  /** Alternative way to set sorting. `{columns: [{prop: 'name', order: 'asc'}]}` Use SortingPlugin to get current sorting state */
  sorting: C.object,
  /** Source - defines main data source. Can be an Object or 2 dimensional array([][]); Keys/indexes referenced from columns Prop. */
  source: C.array,
  /** Stretch strategy for columns by `StretchColumn` plugin. For example if there are more space on the right last column size would be increased. */
  stretch: C.oneOfType([C.bool, C.string]),
  /** Theme name. */
  theme: C.string,
  /** Trimmed rows. Functionality which allows to hide rows from main data set. `trimmedRows` are physical `rgRow` indexes to hide. */
  trimmedRows: C.oneOfType([C.bool, C.number]),
  /** When true enable clipboard. Can be boolean or clipboard config. */
  useClipboard: C.bool,
  /** Column dimensions that use X axis virtual rendering. Defaults to regular columns only to preserve pinned column behavior. Set to `['rgCol', 'colPinStart', 'colPinEnd']` to virtualize all column areas. */
  virtualX: C.array,
  /** Emitted after column resizing. Useful for retrieving the resized columns. Contains a JSON-safe event envelope. */
  aftercolumnresize: C.object,
  /** After data applied or range changed. Contains a JSON-safe event envelope. */
  afteredit: C.object,
  /** After focus render finished. Can be used to access a focus element through `event.target`. This is just a duplicate of `afterfocus` from `revogr-focus.tsx`. Contains a JSON-safe event envelope. */
  afterfocus: C.object,
  /** By `SortingPlugin` <br>Triggered after sorting has been applied and completed. <br>Provides final sorting state and sorting column metadata when available. Contains a JSON-safe event envelope. */
  aftersortingapply: C.object,
  /** Emitted before applying a filter to the data source. Use e.preventDefault() to prevent cell focus change. Modify if you need to change filters. Contains a JSON-safe event envelope. */
  beforefilterapply: C.object,
  /** On header click. Contains a JSON-safe event envelope. */
  headerclick: C.object,
  /** Before the order of `rgRow` is applied. To prevent the default behavior of changing the order of `rgRow`, you can call `e.preventDefault()`. Contains a JSON-safe event envelope. */
  roworderchanged: C.object,
  /** Additional RevoGrid event names to publish through eventData. */
  eventListeners: C.arrayOf(C.string),
  /** Latest JSON-safe event envelope from eventListeners. */
  eventData: C.object,
  /** When true, afteredit also updates the complete Dash source property. */
  syncSourceOnEdit: C.bool,
  /** Dash callback used to report property changes. */
  setProps: C.func
};
qr.defaultProps = {
  eventListeners: [],
  syncSourceOnEdit: !1
};
export {
  qr as RevoGrid
};
//# sourceMappingURL=dash-datagrid.js.map
