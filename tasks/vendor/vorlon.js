var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.deviceIcons = {
                    id: "mobileweb.deviceIcons",
                    title: "define platform icons",
                    description: "Platform icons helps user pinning your website with an icon that fits well on mobile device home.",
                    nodeTypes: ["meta", "link"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                        rulecheck.data = {
                            hasWindowsIcons: false,
                            hasWindowsNotification: false,
                            hasIOSIcons: false
                        };
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        if (node.nodeName == "LINK") {
                            var rel = node.getAttribute("rel");
                            if (rel && rel == "apple-touch-icon-precomposed") {
                                rulecheck.data.hasIOSIcons = true;
                            }
                        }
                        else if (node.nodeName == "META") {
                            var name = node.getAttribute("name");
                            if (name) {
                                if (name.toLowerCase() == "msapplication-notification") {
                                    rulecheck.data.hasWindowsNotification = true;
                                }
                                else if (name.toLowerCase().indexOf("msapplication-") == 0) {
                                    rulecheck.data.hasWindowsIcons = true;
                                }
                            }
                        }
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                        if (!rulecheck.data.hasIOSIcons) {
                            rulecheck.failed = true;
                            rulecheck.items.push({
                                title: VORLON.Tools.htmlToString('add Apple - iOS icons by adding link tags like <link rel="apple-touch-icon-precomposed" href="youricon" sizes="57x57" />')
                            });
                        }
                        if (!rulecheck.data.hasWindowsIcons) {
                            rulecheck.failed = true;
                            rulecheck.items.push({
                                title: VORLON.Tools.htmlToString('add Microsoft - Windows tiles by adding meta tags like <link name="msapplication-square150x150logo" content="yourimage" />')
                            });
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var CSS;
            (function (CSS) {
                CSS.mobileMediaqueries = {
                    id: "mobileweb.usemediaqueries",
                    title: "use responsive web design (media queries)",
                    description: "Even if your website targets only certain devices, you may have users with unexpected devices or screen ratio.",
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                        if (!rulecheck.data) {
                            rulecheck.data = {
                                cssnbqueries: 0,
                                domnbqueries: 0
                            };
                        }
                    },
                    check: function (url, ast, rulecheck, analyzeSummary) {
                        this.checkNodes(url, rulecheck, ast);
                    },
                    checkNodes: function (url, rulecheck, ast) {
                        if (!ast)
                            return;
                        ast.forEach(function (node, i) {
                            var nodeitem = null;
                            if (node.type === "media") {
                                var media = node.selector;
                                if (media) {
                                    media = media.toLowerCase();
                                    if (media.indexOf("width") >= 0 || media.indexOf("height") >= 0) {
                                        rulecheck.data.cssnbqueries++;
                                    }
                                }
                            }
                        });
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                    }
                };
            })(CSS = Rules.CSS || (Rules.CSS = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.mobileMediaqueries = {
                    id: "mobileweb.usemediaqueries",
                    title: "use responsive approaches",
                    description: "Even if your website target only certain devices, you may have users with unexpected devices or screen ratio.",
                    nodeTypes: ["link"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        if (!rulecheck.data) {
                            rulecheck.data = {
                                cssnbqueries: 0,
                                domnbqueries: 0
                            };
                        }
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlstring) {
                        if (!node.getAttribute)
                            return;
                        var rel = node.getAttribute("rel");
                        if (rel && rel.toLocaleLowerCase() == "stylesheet") {
                            var media = node.getAttribute("media");
                            if (media) {
                                media = media.toLowerCase();
                                if (media.indexOf("width") >= 0 || media.indexOf("height") >= 0) {
                                    rulecheck.data.domnbqueries++;
                                }
                            }
                        }
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                        if (rulecheck.data.cssnbqueries == 0 && rulecheck.data.domnbqueries == 0) {
                            if (rulecheck.data.cssnbqueries == 0) {
                                rulecheck.failed = true;
                                rulecheck.items.push({
                                    title: 'your css (either files or inline) does not use any media queries'
                                });
                            }
                            if (rulecheck.data.domnbqueries == 0) {
                                rulecheck.failed = true;
                                rulecheck.items.push({
                                    title: 'your link tags does not use any media queries'
                                });
                            }
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.useViewport = {
                    id: "mobileweb.use-viewport",
                    title: "use meta viewport",
                    description: "Use meta viewport tag to choose how your website will get scaled on smaller devices like phones. Define at least &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;",
                    nodeTypes: ["meta"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.failed = true;
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        var viewportattr = node.getAttribute("name");
                        if (viewportattr && viewportattr.toLowerCase() == "viewport") {
                            rulecheck.failed = false;
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.dontUsePlugins = {
                    id: "webstandards.dont-use-plugins",
                    title: "not using object and embed",
                    description: "With HTML5, embed or object tags can often be replaced with HTML5 features.",
                    nodeTypes: ["EMBED", "OBJECT"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        var source = null, data = null, type = null;
                        var source = node.getAttribute("src");
                        if (source)
                            source = source.toLowerCase();
                        else
                            source = "";
                        var data = node.getAttribute("data");
                        if (data)
                            data = data.toLowerCase();
                        else
                            data = "";
                        var type = node.getAttribute("type");
                        if (type)
                            type = type.toLowerCase();
                        else
                            type = "";
                        if (source.indexOf(".swf") > 0 || data.indexOf("swf") > 0) {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "consider using HTML5 instead of Flash", content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                        else if (type.indexOf("silverlight") > 0) {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "consider using HTML5 instead of Silverlight", content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                        else if (source.indexOf(".svg") > 0 || data.indexOf("svg") > 0) {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "dont't use SVG with " + node.nodeType, content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                        else {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "use HTML5 instead of embed or object elements", content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.dontUseBrowserConditionalComment = {
                    id: "webstandards.avoid-browser-specific-css",
                    title: "avoid conditional comments",
                    description: "Conditional comments are not the best way to adapt your website to target browser, and support is dropped for IE > 9.",
                    nodeTypes: ["#comment"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        var commentContent = node.nodeValue.toLowerCase();
                        var hasConditionalComment = commentContent.indexOf("[if ie ") >= 0 ||
                            commentContent.indexOf("[if !ie]") >= 0 ||
                            commentContent.indexOf("[if gt ie ") >= 0 ||
                            commentContent.indexOf("[if gte ie ") >= 0 ||
                            commentContent.indexOf("[if lt ie ") >= 0 ||
                            commentContent.indexOf("[if lte ie ") >= 0;
                        if (hasConditionalComment) {
                            rulecheck.failed = true;
                            rulecheck.items.push({
                                title: VORLON.Tools.htmlToString(node.nodeValue)
                            });
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var CSS;
            (function (CSS) {
                var compatiblePrefixes = {
                    'animation': 'webkit',
                    'animation-delay': 'webkit',
                    'animation-direction': 'webkit',
                    'animation-duration': 'webkit',
                    'animation-fill-mode': 'webkit',
                    'animation-iteration-count': 'webkit',
                    'animation-name': 'webkit',
                    'animation-play-state': 'webkit',
                    'animation-timing-function': 'webkit',
                    'appearance': 'webkit moz',
                    'border-end': 'webkit moz',
                    'border-end-color': 'webkit moz',
                    'border-end-style': 'webkit moz',
                    'border-end-width': 'webkit moz',
                    'border-image': 'webkit o',
                    'border-start': 'webkit moz',
                    'border-start-color': 'webkit moz',
                    'border-start-style': 'webkit moz',
                    'border-start-width': 'webkit moz',
                    'box-sizing': 'webkit',
                    'column-count': 'webkit moz',
                    'column-gap': 'webkit moz',
                    'column-rule': 'webkit moz',
                    'column-rule-color': 'webkit moz',
                    'column-rule-style': 'webkit moz',
                    'column-rule-width': 'webkit moz',
                    'column-width': 'webkit moz',
                    'hyphens': 'webkit moz ms',
                    'margin-end': 'webkit moz',
                    'margin-start': 'webkit moz',
                    'padding-end': 'webkit moz',
                    'padding-start': 'webkit moz',
                    'tab-size': 'webkit moz o',
                    'text-size-adjust': 'webkit moz ms',
                    'transform': 'webkit ms',
                    'transform-origin': 'webkit ms',
                    'transition': 'webkit moz o',
                    'transition-delay': 'webkit moz o',
                    'transition-duration': 'webkit',
                    'transition-property': 'webkit',
                    'transition-timing-function': 'webkit',
                    'user-select': 'webkit moz ms'
                };
                var variations, prefixed, arrayPush = Array.prototype.push, applyTo = new Array();
                for (var prop in compatiblePrefixes) {
                    if (compatiblePrefixes.hasOwnProperty(prop)) {
                        variations = [];
                        prefixed = compatiblePrefixes[prop].split(' ');
                        for (var i = 0, len = prefixed.length; i < len; i++) {
                            variations.push('-' + prefixed[i] + '-' + prop);
                        }
                        compatiblePrefixes[prop] = variations;
                        variations.forEach(function (obj, i) {
                            applyTo[obj] = i;
                        });
                    }
                }
                CSS.cssprefixes = {
                    id: "webstandards.prefixes",
                    title: "incorrect use of css prefixes",
                    description: "Ensure you use all vendor prefixes and unprefixed version for HTML5 CSS properties.",
                    check: function (url, ast, rulecheck, analyzeSummary) {
                        var nodes = [];
                        var filerules = {
                            title: url,
                            type: "itemslist",
                            items: []
                        };
                        rulecheck.items = rulecheck.items || [];
                        this.checkNodes(url, compatiblePrefixes, filerules, ast, nodes);
                        if (filerules.items.length) {
                            rulecheck.items.push(filerules);
                            rulecheck.failed = true;
                        }
                    },
                    unprefixedPropertyName: function (property) {
                        return property.replace("-webkit-", "").replace("-moz-", "").replace("-o-", "").replace("-ms-", "");
                    },
                    getMissingPrefixes: function (compatiblePrefixes, node, property) {
                        var allProperty = compatiblePrefixes[property];
                        var prefixes = [];
                        allProperty.forEach(function (prop, y) {
                            var hasPrefix = node.rules.some(function (r) { return r.directive == prop; });
                            if (!hasPrefix) {
                                prefixes.push(prop);
                            }
                        });
                        return prefixes;
                    },
                    checkNodes: function (url, compatiblePrefixes, rulecheck, ast, nodes) {
                        var _this = this;
                        if (!ast)
                            return;
                        ast.forEach(function (node, i) {
                            var nodeitem = null;
                            if (node.rules && node.rules.length > 0) {
                                var checked = {};
                                for (var x = 0, len = node.rules.length; x < len; x++) {
                                    var property = node.rules[x].directive;
                                    var unprefixed = _this.unprefixedPropertyName(property);
                                    if (!checked[unprefixed] && compatiblePrefixes.hasOwnProperty(unprefixed)) {
                                        if (compatiblePrefixes[unprefixed].indexOf(unprefixed) == -1)
                                            compatiblePrefixes[unprefixed].push(unprefixed);
                                        var missings = _this.getMissingPrefixes(compatiblePrefixes, node, unprefixed);
                                        if (missings.length) {
                                            if (!nodeitem) {
                                                rulecheck.failed = true;
                                                rulecheck.items = rulecheck.items || [];
                                                nodeitem = {
                                                    title: node.selector,
                                                    items: []
                                                };
                                                rulecheck.items.push(nodeitem);
                                            }
                                            nodeitem.items.push({
                                                title: "<strong>" + unprefixed + "</strong> : missing " + missings,
                                            });
                                        }
                                    }
                                    checked[unprefixed] = true;
                                }
                            }
                            if (node.type === "media") {
                                _this.checkNodes(url, compatiblePrefixes, rulecheck, node.subStyles, nodes);
                            }
                        });
                    }
                };
            })(CSS = Rules.CSS || (Rules.CSS = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.modernDocType = {
                    id: "webstandards.documentmode",
                    title: "use a modern doctype",
                    description: "Modern doctype like &lt;!DOCTYPE html&gt; are better for browser compatibility and enable using HTML5 features.",
                    nodeTypes: ["META"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        var httpequiv = node.getAttribute("http-equiv");
                        if (httpequiv && httpequiv.toLowerCase() == "x-ua-compatible") {
                            var content = node.getAttribute("content");
                            if (!(content.toLowerCase().indexOf("edge") >= 0)) {
                                rulecheck.failed = true;
                                rulecheck.items.push({
                                    title: "your website use IE's document mode compatibility for an older version of IE ",
                                    content: VORLON.Tools.htmlToString(node.outerHTML)
                                });
                            }
                        }
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                        var doctype = analyzeSummary.doctype || {};
                        var current = {
                            title: "used doctype is <br/>" + VORLON.Tools.htmlToString(doctype.html)
                        };
                        if (doctype.publicId || doctype.systemId) {
                            rulecheck.failed = true;
                            rulecheck.items.push(current);
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var JavaScript;
            (function (JavaScript) {
                var libraries = [
                    {
                        name: 'Prototype',
                        minVersions: [
                            { major: '1.7.', minor: '2' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/Prototype JavaScript framework, version (\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'Dojo',
                        minVersions: [
                            { major: '1.5.', minor: '3' },
                            { major: '1.6.', minor: '2' },
                            { major: '1.7.', minor: '5' },
                            { major: '1.8.', minor: '5' },
                            { major: '1.9.', minor: '2' },
                            { major: '1.10.', minor: '0' }
                        ],
                        check: function (checkVersion, scriptText) {
                            if (scriptText.indexOf('dojo') === -1) {
                                return false;
                            }
                            var version = scriptText.match(/\.version\s*=\s*\{\s*major:\s*(\d+)\D+(\d+)\D+(\d+)/m);
                            if (version) {
                                return checkVersion(this, version[1] + '.' + version[2] + '.' + version[3]);
                            }
                            version = scriptText.match(/\s*major:\s*(\d+),\s*minor:\s*(\d+),\s*patch:\s*(\d+),/mi);
                            return version && checkVersion(this, version[1] + '.' + version[2] + '.' + version[3]);
                        }
                    },
                    {
                        name: 'Mootools',
                        minVersions: [
                            { major: '1.2.', minor: '6' },
                            { major: '1.4.', minor: '5' },
                            { major: '1.5.', minor: '' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/this.MooTools\s*=\s*\{version:\s*'(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'SWFObject',
                        minVersions: [
                            { major: '2.', minor: '2' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s+SWFObject v(\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery Form Plugin',
                        minVersions: [
                            { major: '3.', minor: '22' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/Form Plugin\s+\*\s+version: (\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'Modernizr',
                        minVersions: [
                            { major: '2.5.', minor: '2' },
                            { major: '2.6.', minor: '2' },
                            { major: '2.7.', minor: '1' },
                            { major: '2.8.', minor: '3' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*Modernizr\s+(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery cookie',
                        minVersions: [
                            { major: '1.3.', minor: '1' },
                            { major: '1.4.', minor: '1' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*jQuery Cookie Plugin v(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'hoverIntent',
                        minVersions: [
                            { major: '1.8.', minor: '1' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*hoverIntent v(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery Easing',
                        minVersions: [
                            { major: '1.3.', minor: '0' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*jQuery Easing v(\d+\.\d+)\s*/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'underscore',
                        minVersions: [
                            { major: '1.8.', minor: '3' },
                            { major: '1.7.', minor: '0' },
                            { major: '1.6.', minor: '0' },
                            { major: '1.5.', minor: '2' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/exports._(?:.*)?.VERSION="(\d+.\d+.\d+)"/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'hammer js',
                        minVersions: [
                            { major: '2.0.', minor: '4' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            if (scriptText.indexOf('hammer.input') !== -1) {
                                var version = scriptText.match(/.VERSION\s*=\s*['|"](\d+.\d+.\d+)['|"]/m);
                                return version && checkVersion(this, version[1]);
                            }
                            return false;
                        }
                    },
                    {
                        name: 'jQuery Superfish',
                        minVersions: [
                            { major: '1.7.', minor: '4' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/jQuery Superfish Menu Plugin - v(\d+.\d+.\d+)"/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery mousewheel',
                        minVersions: [
                            { major: '3.1.', minor: '12' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/.mousewheel={version:"(\d+.\d+.\d+)/);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery mobile',
                        minVersions: [
                            { major: '1.4.', minor: '5' },
                            { major: '1.3.', minor: '2' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/.mobile,{version:"(\d+.\d+.\d+)/);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery UI',
                        minVersions: [
                            { major: '1.8.', minor: '24' },
                            { major: '1.9.', minor: '2' },
                            { major: '1.10.', minor: '4' },
                            { major: '1.11.', minor: '4' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\.ui,[\s\r\n]*\{[\s\r\n]*version:\s*"(\d+.\d+.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery',
                        minVersions: [
                            { major: '1.6.', minor: '4' },
                            { major: '1.7.', minor: '2' },
                            { major: '1.8.', minor: '2' },
                            { major: '1.9.', minor: '1' },
                            { major: '1.10.', minor: '2' },
                            { major: '1.11.', minor: '3' },
                            { major: '2.0.', minor: '3' },
                            { major: '2.1.', minor: '4' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var regex = /(?:jQuery\s*v)(\d+.\d+.\d+)\s/g;
                            var regversion = regex.exec(scriptText);
                            if (regversion) {
                                var isPluginRegExp = new RegExp('(?::\\s*)' + regversion[0], 'g');
                                if (!isPluginRegExp.exec(scriptText)) {
                                    return checkVersion(this, regversion[1]);
                                }
                            }
                            var matchversion = scriptText.match(/jquery:\s*"([^"]+)/);
                            if (matchversion) {
                                return checkVersion(this, matchversion[1]);
                            }
                            var regex = /(?:jquery[,\)].{0,200}=")(\d+\.\d+)(\..*?)"/gi;
                            var results = regex.exec(scriptText);
                            var version = results ? (results[1] + (results[2] || '')) : null;
                            return version && checkVersion(this, version);
                        }
                    }
                ];
                JavaScript.librariesVersions = {
                    id: "webstandards.javascript-libraries-versions",
                    title: "up to date javascript libraries",
                    description: "Try being up to date with your JavaScript libraries like jQuery. Latest versions usually improves performances and browsers compatibility.",
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (url, javascriptContent, rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        var filecheck = null;
                        if (!javascriptContent || url == "inline")
                            return;
                        for (var i = 0; i < libraries.length; i++) {
                            var lib = libraries[i], result;
                            result = lib.check.call(lib, this.checkVersion, javascriptContent);
                            if (result && result.needsUpdate) {
                                if (!filecheck) {
                                    filecheck = {
                                        title: url,
                                        items: []
                                    };
                                    rulecheck.items.push(filecheck);
                                }
                                filecheck.items.push({
                                    title: "detected " + result.name + " version " + result.version,
                                });
                                rulecheck.failed = true;
                                break;
                            }
                        }
                    },
                    checkVersion: function (library, version) {
                        var vinfo = {
                            name: library.name,
                            needsUpdate: true,
                            minVersion: library.minVersions[0].major + library.minVersions[0].minor,
                            version: version,
                            bannedVersion: null
                        };
                        if (library.patchOptional) {
                            var parts = version.match(/^(\d+\.\d+)(.*)$/);
                            if (parts && !/^\.\d+/.test(parts[2])) {
                                version = parts[1] + '.0' + parts[2];
                            }
                        }
                        for (var i = 0; i < library.minVersions.length; i++) {
                            var gv = library.minVersions[i];
                            if (version.indexOf(gv.major) === 0) {
                                vinfo.minVersion = gv.major + gv.minor;
                                vinfo.needsUpdate = +version.slice(gv.major.length) < +gv.minor;
                                break;
                            }
                        }
                        if (library.bannedVersions) {
                            if (library.bannedVersions.indexOf(version) >= 0) {
                                vinfo.bannedVersion = version;
                                vinfo.needsUpdate = true;
                            }
                        }
                        return vinfo;
                    }
                };
            })(JavaScript = Rules.JavaScript || (Rules.JavaScript = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var Tools = (function () {
        function Tools() {
        }
        Tools.QuerySelectorById = function (root, id) {
            if (root.querySelector) {
                return root.querySelector("#" + id);
            }
            return document.getElementById(id);
        };
        Tools.SetImmediate = function (func) {
            if (window.setImmediate) {
                setImmediate(func);
            }
            else {
                setTimeout(func, 0);
            }
        };
        Tools.setLocalStorageValue = function (key, data) {
            if (localStorage) {
                try {
                    localStorage.setItem(key, data);
                }
                catch (e) {
                }
            }
        };
        Tools.getLocalStorageValue = function (key) {
            if (localStorage) {
                try {
                    return localStorage.getItem(key);
                }
                catch (e) {
                    return "";
                }
            }
        };
        Tools.Hook = function (rootObject, functionToHook, hookingFunction) {
            var previousFunction = rootObject[functionToHook];
            rootObject[functionToHook] = function () {
                var optionalParams = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    optionalParams[_i - 0] = arguments[_i];
                }
                hookingFunction(optionalParams);
                previousFunction.apply(rootObject, optionalParams);
            };
            return previousFunction;
        };
        Tools.HookProperty = function (rootObject, propertyToHook, callback) {
            var initialValue = rootObject[propertyToHook];
            Object.defineProperty(rootObject, propertyToHook, {
                get: function () {
                    if (callback) {
                        callback(VORLON.Tools.getCallStack(1));
                    }
                    return initialValue;
                }
            });
        };
        Tools.getCallStack = function (skipped) {
            skipped = skipped || 0;
            try {
                throw new Error();
            }
            catch (e) {
                var stackLines = e.stack.split('\n');
                var callerIndex = 0;
                for (var i = 2 + skipped, l = stackLines.length; i < l; i++) {
                    if (!(stackLines[i].indexOf("http://") >= 0))
                        continue;
                    callerIndex = i;
                    break;
                }
                var res = {
                    stack: e.stack,
                };
                var linetext = stackLines[callerIndex];
                var opening = linetext.indexOf("http://") || linetext.indexOf("https://");
                if (opening > 0) {
                    var closing = linetext.indexOf(")", opening);
                    if (closing < 0)
                        closing = linetext.length - 1;
                    var filename = linetext.substr(opening, closing - opening);
                    var linestart = filename.indexOf(":", filename.lastIndexOf("/"));
                    res.file = filename.substr(0, linestart);
                }
                return res;
            }
        };
        Tools.CreateCookie = function (name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        };
        Tools.ReadCookie = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return "";
        };
        Tools.CreateGUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        Tools.RemoveEmpties = function (arr) {
            var len = arr.length;
            for (var i = len - 1; i >= 0; i--) {
                if (!arr[i]) {
                    arr.splice(i, 1);
                    len--;
                }
            }
            return len;
        };
        Tools.AddClass = function (e, name) {
            if (e.classList) {
                if (name.indexOf(" ") < 0) {
                    e.classList.add(name);
                }
                else {
                    var namesToAdd = name.split(" ");
                    Tools.RemoveEmpties(namesToAdd);
                    for (var i = 0, len = namesToAdd.length; i < len; i++) {
                        e.classList.add(namesToAdd[i]);
                    }
                }
                return e;
            }
            else {
                var className = e.className;
                var names = className.split(" ");
                var l = Tools.RemoveEmpties(names);
                var toAdd;
                if (name.indexOf(" ") >= 0) {
                    namesToAdd = name.split(" ");
                    Tools.RemoveEmpties(namesToAdd);
                    for (i = 0; i < l; i++) {
                        var found = namesToAdd.indexOf(names[i]);
                        if (found >= 0) {
                            namesToAdd.splice(found, 1);
                        }
                    }
                    if (namesToAdd.length > 0) {
                        toAdd = namesToAdd.join(" ");
                    }
                }
                else {
                    var saw = false;
                    for (i = 0; i < l; i++) {
                        if (names[i] === name) {
                            saw = true;
                            break;
                        }
                    }
                    if (!saw) {
                        toAdd = name;
                    }
                }
                if (toAdd) {
                    if (l > 0 && names[0].length > 0) {
                        e.className = className + " " + toAdd;
                    }
                    else {
                        e.className = toAdd;
                    }
                }
                return e;
            }
        };
        Tools.RemoveClass = function (e, name) {
            if (e.classList) {
                if (e.classList.length === 0) {
                    return e;
                }
                var namesToRemove = name.split(" ");
                Tools.RemoveEmpties(namesToRemove);
                for (var i = 0, len = namesToRemove.length; i < len; i++) {
                    e.classList.remove(namesToRemove[i]);
                }
                return e;
            }
            else {
                var original = e.className;
                if (name.indexOf(" ") >= 0) {
                    namesToRemove = name.split(" ");
                    Tools.RemoveEmpties(namesToRemove);
                }
                else {
                    if (original.indexOf(name) < 0) {
                        return e;
                    }
                    namesToRemove = [name];
                }
                var removed;
                var names = original.split(" ");
                var namesLen = Tools.RemoveEmpties(names);
                for (i = namesLen - 1; i >= 0; i--) {
                    if (namesToRemove.indexOf(names[i]) >= 0) {
                        names.splice(i, 1);
                        removed = true;
                    }
                }
                if (removed) {
                    e.className = names.join(" ");
                }
                return e;
            }
        };
        Tools.ToggleClass = function (e, name, callback) {
            if (e.className.match(name)) {
                Tools.RemoveClass(e, name);
                if (callback)
                    callback(false);
            }
            else {
                Tools.AddClass(e, name);
                if (callback)
                    callback(true);
            }
        };
        Tools.htmlToString = function (text) {
            return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };
        return Tools;
    })();
    VORLON.Tools = Tools;
    var FluentDOM = (function () {
        function FluentDOM(nodeType, className, parentElt, parent) {
            this.childs = [];
            if (nodeType) {
                this.element = document.createElement(nodeType);
                if (className)
                    this.element.className = className;
                if (parentElt)
                    parentElt.appendChild(this.element);
                this.parent = parent;
                if (parent) {
                    parent.childs.push(this);
                }
            }
        }
        FluentDOM.forElement = function (element) {
            var res = new FluentDOM(null);
            res.element = element;
            return res;
        };
        FluentDOM.prototype.addClass = function (classname) {
            this.element.classList.add(classname);
            return this;
        };
        FluentDOM.prototype.toggleClass = function (classname) {
            this.element.classList.toggle(classname);
            return this;
        };
        FluentDOM.prototype.className = function (classname) {
            this.element.className = classname;
            return this;
        };
        FluentDOM.prototype.opacity = function (opacity) {
            this.element.style.opacity = opacity;
            return this;
        };
        FluentDOM.prototype.display = function (display) {
            this.element.style.display = display;
            return this;
        };
        FluentDOM.prototype.hide = function () {
            this.element.style.display = 'none';
            return this;
        };
        FluentDOM.prototype.visibility = function (visibility) {
            this.element.style.visibility = visibility;
            return this;
        };
        FluentDOM.prototype.text = function (text) {
            this.element.textContent = text;
            return this;
        };
        FluentDOM.prototype.html = function (text) {
            this.element.innerHTML = text;
            return this;
        };
        FluentDOM.prototype.attr = function (name, val) {
            this.element.setAttribute(name, val);
            return this;
        };
        FluentDOM.prototype.editable = function (editable) {
            this.element.contentEditable = editable ? "true" : "false";
            return this;
        };
        FluentDOM.prototype.style = function (name, val) {
            this.element.style[name] = val;
            return this;
        };
        FluentDOM.prototype.appendTo = function (elt) {
            elt.appendChild(this.element);
            return this;
        };
        FluentDOM.prototype.append = function (nodeType, className, callback) {
            var child = new FluentDOM(nodeType, className, this.element, this);
            if (callback) {
                callback(child);
            }
            return this;
        };
        FluentDOM.prototype.createChild = function (nodeType, className) {
            var child = new FluentDOM(nodeType, className, this.element, this);
            return child;
        };
        FluentDOM.prototype.click = function (callback) {
            this.element.addEventListener('click', callback);
            return this;
        };
        FluentDOM.prototype.blur = function (callback) {
            this.element.addEventListener('blur', callback);
            return this;
        };
        FluentDOM.prototype.keydown = function (callback) {
            this.element.addEventListener('keydown', callback);
            return this;
        };
        return FluentDOM;
    })();
    VORLON.FluentDOM = FluentDOM;
})(VORLON || (VORLON = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9ybG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tLXZvcmxvbi9ydWxlcy9tb2JpbGV3ZWIuZGV2aWNlaWNvbnMudHMiLCJjdXN0b20tdm9ybG9uL3J1bGVzL21vYmlsZXdlYi5tZWRpYXF1ZXJpZXMudHMiLCJjdXN0b20tdm9ybG9uL3J1bGVzL21vYmlsZXdlYi52aWV3cG9ydC50cyIsImN1c3RvbS12b3Jsb24vcnVsZXMvd2Vic3RhbmRhcmRzLmFjdGl2ZXgudHMiLCJjdXN0b20tdm9ybG9uL3J1bGVzL3dlYnN0YW5kYXJkcy5jb25kaXRpb25hbGNvbW1lbnRzLnRzIiwiY3VzdG9tLXZvcmxvbi9ydWxlcy93ZWJzdGFuZGFyZHMuY3NzcHJlZml4ZXMudHMiLCJjdXN0b20tdm9ybG9uL3J1bGVzL3dlYnN0YW5kYXJkcy5kb2N1bWVudG1vZGUudHMiLCJjdXN0b20tdm9ybG9uL3J1bGVzL3dlYnN0YW5kYXJkcy5qc2xpYnZlcnNpb25zLnRzIiwiY3VzdG9tLXZvcmxvbi92b3Jsb24udG9vbHMudHMiLCJjdXN0b20tdm9ybG9uL3Zvcmxvbi53ZWJzdGFuZGFyZHMuaW50ZXJmYWNlcy50cyJdLCJuYW1lcyI6WyJWT1JMT04iLCJWT1JMT04uV2ViU3RhbmRhcmRzIiwiVk9STE9OLldlYlN0YW5kYXJkcy5SdWxlcyIsIlZPUkxPTi5XZWJTdGFuZGFyZHMuUnVsZXMuRE9NIiwiVk9STE9OLldlYlN0YW5kYXJkcy5SdWxlcy5DU1MiLCJWT1JMT04uV2ViU3RhbmRhcmRzLlJ1bGVzLkphdmFTY3JpcHQiLCJWT1JMT04uVG9vbHMiLCJWT1JMT04uVG9vbHMuY29uc3RydWN0b3IiLCJWT1JMT04uVG9vbHMuUXVlcnlTZWxlY3RvckJ5SWQiLCJWT1JMT04uVG9vbHMuU2V0SW1tZWRpYXRlIiwiVk9STE9OLlRvb2xzLnNldExvY2FsU3RvcmFnZVZhbHVlIiwiVk9STE9OLlRvb2xzLmdldExvY2FsU3RvcmFnZVZhbHVlIiwiVk9STE9OLlRvb2xzLkhvb2siLCJWT1JMT04uVG9vbHMuSG9va1Byb3BlcnR5IiwiVk9STE9OLlRvb2xzLmdldENhbGxTdGFjayIsIlZPUkxPTi5Ub29scy5DcmVhdGVDb29raWUiLCJWT1JMT04uVG9vbHMuUmVhZENvb2tpZSIsIlZPUkxPTi5Ub29scy5DcmVhdGVHVUlEIiwiVk9STE9OLlRvb2xzLlJlbW92ZUVtcHRpZXMiLCJWT1JMT04uVG9vbHMuQWRkQ2xhc3MiLCJWT1JMT04uVG9vbHMuUmVtb3ZlQ2xhc3MiLCJWT1JMT04uVG9vbHMuVG9nZ2xlQ2xhc3MiLCJWT1JMT04uVG9vbHMuaHRtbFRvU3RyaW5nIiwiVk9STE9OLkZsdWVudERPTSIsIlZPUkxPTi5GbHVlbnRET00uY29uc3RydWN0b3IiLCJWT1JMT04uRmx1ZW50RE9NLmZvckVsZW1lbnQiLCJWT1JMT04uRmx1ZW50RE9NLmFkZENsYXNzIiwiVk9STE9OLkZsdWVudERPTS50b2dnbGVDbGFzcyIsIlZPUkxPTi5GbHVlbnRET00uY2xhc3NOYW1lIiwiVk9STE9OLkZsdWVudERPTS5vcGFjaXR5IiwiVk9STE9OLkZsdWVudERPTS5kaXNwbGF5IiwiVk9STE9OLkZsdWVudERPTS5oaWRlIiwiVk9STE9OLkZsdWVudERPTS52aXNpYmlsaXR5IiwiVk9STE9OLkZsdWVudERPTS50ZXh0IiwiVk9STE9OLkZsdWVudERPTS5odG1sIiwiVk9STE9OLkZsdWVudERPTS5hdHRyIiwiVk9STE9OLkZsdWVudERPTS5lZGl0YWJsZSIsIlZPUkxPTi5GbHVlbnRET00uc3R5bGUiLCJWT1JMT04uRmx1ZW50RE9NLmFwcGVuZFRvIiwiVk9STE9OLkZsdWVudERPTS5hcHBlbmQiLCJWT1JMT04uRmx1ZW50RE9NLmNyZWF0ZUNoaWxkIiwiVk9STE9OLkZsdWVudERPTS5jbGljayIsIlZPUkxPTi5GbHVlbnRET00uYmx1ciIsIlZPUkxPTi5GbHVlbnRET00ua2V5ZG93biJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxNQUFNLENBdURaO0FBdkRELFdBQU8sTUFBTTtJQUFDQSxJQUFBQSxZ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QSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNURBLE9BQU9BLEdBQUdBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSkEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDakJBLENBQUNBO1lBRURBLFFBQVFBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEtBQUtBLEdBQUdBLE9BQU9BLEdBQUdBLFVBQVVBLENBQUNBO1FBQ2hFQSxDQUFDQTtRQUVhVCxnQkFBVUEsR0FBeEJBLFVBQXlCQSxJQUFZQTtZQUNqQ1UsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDeEJBLElBQUlBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3BDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDakNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNkQSxPQUFPQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDekJBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUNqQ0EsQ0FBQ0E7Z0JBRURBLEVBQUVBLENB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

module.exports = VORLON;
