(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{202:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.withMDXComponents=void 0;var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},r=i(t(0)),s=i(t(69)),o=i(t(4));function i(e){return e&&e.__esModule?e:{default:e}}var l=(0,s.default)({}),c=l.Provider,m=l.Consumer;n.withMDXComponents=function(e){return function(n){var t=n.components,s=function(e,n){var t={};for(var a in e)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}(n,["components"]);return r.default.createElement(m,null,function(n){return r.default.createElement(e,a({components:t||n},s))})}};var u=function(e){var n=e.components,t=e.children;return r.default.createElement(c,{value:n},t)};u.propTypes={components:o.default.object.isRequired,children:o.default.element.isRequired},n.default=u},203:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(204);Object.defineProperty(n,"MDXTag",{enumerable:!0,get:function(){return s(a).default}});var r=t(202);function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"MDXProvider",{enumerable:!0,get:function(){return s(r).default}})},204:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},r=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),s=t(0),o=c(s),i=c(t(205)),l=t(202);function c(e){return e&&e.__esModule?e:{default:e}}var m={inlineCode:"code",wrapper:"div"},u=function(e){function n(){return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,s.Component),r(n,[{key:"render",value:function(){var e=this.props,n=e.name,t=e.parentName,r=e.props,s=void 0===r?{}:r,l=e.children,c=e.components,u=void 0===c?{}:c,p=e.Layout,d=e.layoutProps,v=u[t+"."+n]||u[n]||m[n]||n;return p?((0,i.default)(this,p),o.default.createElement(p,a({components:u},d),o.default.createElement(v,s,l))):o.default.createElement(v,s,l)}}]),n}();n.default=(0,l.withMDXComponents)(u)},205:function(e,n,t){"use strict";var a={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},r={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},s=Object.defineProperty,o=Object.getOwnPropertyNames,i=Object.getOwnPropertySymbols,l=Object.getOwnPropertyDescriptor,c=Object.getPrototypeOf,m=c&&c(Object);e.exports=function e(n,t,u){if("string"!==typeof t){if(m){var p=c(t);p&&p!==m&&e(n,p,u)}var d=o(t);i&&(d=d.concat(i(t)));for(var v=0;v<d.length;++v){var g=d[v];if(!a[g]&&!r[g]&&(!u||!u[g])){var f=l(t,g);try{s(n,g,f)}catch(D){}}}return n}return n}},206:function(e,n,t){"use strict";function a(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)t=s[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)t=s[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}t.d(n,"a",function(){return a})},207:function(e,n,t){"use strict";t.r(n);var a=t(206),r=t(0),s=t.n(r),o=t(203);n.default=function(e){var n=e.components;Object(a.a)(e,["components"]);return s.a.createElement(o.MDXTag,{name:"wrapper",components:n},s.a.createElement(o.MDXTag,{name:"h1",components:n},"Foire aux questions"),s.a.createElement(o.MDXTag,{name:"h2",components:n},"Etape 1 - Avant le d\xe9p\xf4t, je m'informe sur la faisabilit\xe9 de mon projet"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"C'est quoi ce site/service ? Pourquoi ai-je \xe9t\xe9 envoy\xe9 ici\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Permis de construire facile est une start-up incub\xe9e par le minist\xe8re de\nla coh\xe9sion des territoires et des relations avec les collectivit\xe9s\nterritoriales. Le service propos\xe9 a pour objectif de faciliter\nl'obtention d'une d\xe9claration pr\xe9alable, une autorisation administrative\nqui est indispensable pour effectuer certains types de travaux."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Ce site est ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"public et gratuit"),". Il vous permet notamment de ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"d\xe9poser\n100% en ligne votre demande et d'interagir simplement")," avec le service\nen charge d'instruire votre dossier."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Ce site a vocation \xe0 \xe9voluer pour r\xe9pondre au mieux aux attentes des\nusagers. Les fonctionnalit\xe9s accessibles aujourd'hui peuvent \xeatre\nenrichies. N'h\xe9sitez pas \xe0 nous faire des retours par mail \xe0\n",s.a.createElement(o.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"mailto:%20ads-relations-collectivites@developpement-durable.gouv.fr"}},"ads-relations-collectivites@developpement-durable.gouv.fr"),"."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"D\xe9claration pr\xe9alable, permis de construire... quelle diff\xe9rence\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"La d\xe9livrance d'une autorisation d'urbanisme permet \xe0 la commune de\nv\xe9rifier la conformit\xe9 des travaux par rapport aux r\xe8gles d'urbanisme.\nSelon l'importance des travaux, il faut d\xe9poser une demande de permis\n(permis de construire, d'am\xe9nager",".","..) ou une d\xe9claration pr\xe9alable."),s.a.createElement(o.MDXTag,{name:"p",components:n},"D'une mani\xe8re g\xe9n\xe9rale :"),s.a.createElement(o.MDXTag,{name:"ul",components:n},s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"la ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"li"},"d\xe9claration pr\xe9alable")," concerne la r\xe9alisation de ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"li"},"travaux de\nfaible importance")," (ex. changement de fen\xeatre, construction de\ncl\xf4ture, etc.)"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"le ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"li"},"permis de construire")," concerne les ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"li"},"travaux de construction\nde grande ampleur")," (construction d'une maison individuelle et/ou\nses annexes). Toutefois, il s'applique \xe9galement \xe0 plusieurs autres\ncas (certains agrandissements +40m\xb2, construction d'un abri de\njardin de plus de 20 m\xb2",".","..)")),s.a.createElement(o.MDXTag,{name:"p",components:n},"Permis de construire facile vous guidera en fonction de votre projet."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Pourquoi le site ne traite que les d\xe9clarations pr\xe9alables (DP) de travaux ?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"En tant que start-up d'\xe9tat, \xabPermis de construire facile\xbb r\xe9fl\xe9chit \xe0\nla probl\xe9matique de la d\xe9mat\xe9rialisation des demandes d'urbanisme avec\nune approche startup : au plus pr\xe8s des besoins des utilisateurs et avec\ndes moyens limit\xe9s."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Il a fallu faire des choix pour commencer. Nous avons choisi de d\xe9marrer\navec les demandes pr\xe9alables pour 2 raisons :"),s.a.createElement(o.MDXTag,{name:"ul",components:n},s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"il y a beaucoup plus de d\xe9clarations pr\xe9alables que de permis de\nconstruire en France : nous avons pr\xe9f\xe9r\xe9 nous concentrer sur la\nd\xe9marche qui aurait le plus d'impact pour les citoyens"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"la d\xe9claration pr\xe9alable est une d\xe9marche plus simple que le permis\nde construire, c'\xe9tait le signe pour nous que nous pouvons plus\nrapidement apporter des r\xe9ponses et r\xe9soudre ce probl\xe8me")),s.a.createElement(o.MDXTag,{name:"p",components:n},"Par la suite, nous travaillerons \xe0 \xe9largir les types d'autorisations qui\npeuvent \xeatre d\xe9pos\xe9es en ligne."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"O\xf9 v\xe9rifier la faisabilit\xe9 de mon projet\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"C'est important ! En effet, lorsque vous construisez sur votre terrain,\nque vous agrandissez votre maison ou que vous modifiez l'aspect\next\xe9rieur de votre habitat, les services d'urbanisme de votre commune\nont un droit de regard sur votre projet."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Attention : chaque commune dispose de ses propres r\xe9glementations\nd'urbanisme. Le choix des couleurs, des mat\xe9riaux et le rendu final du\nprojet doivent \xeatre en accord avec le paysage environnant et les\ncontraintes. C'est notamment le cas si votre projet se situe dans une\nzone prot\xe9g\xe9e ou \xe0 proximit\xe9 d'un monument class\xe9. La majorit\xe9 des\ncommunes ont sp\xe9cifi\xe9 les r\xe9glementations en vigueur \xe0 respecter en\nterme de construction dans un Plan Local d'Urbanisme (PLU)."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Ainsi, avant de vous lancer dans vos travaux nous recommandons :"),s.a.createElement(o.MDXTag,{name:"ul",components:n},s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"de consulter le Plan Local D'urbanisme (PLU) de votre commune s'il\n\xe0 \xe9t\xe9 mis en ligne le site g\xe9oportail de l'urbanisme\n(",s.a.createElement(o.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"https://www.geoportail.gouv.fr"}},"https://www.geoportail.gouv.fr/"),")"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"ou de vous renseigner aupr\xe8s de votre mairie si l'information n'est\npas accessible (site internet ou appel du service d'urbanisme)")),s.a.createElement(o.MDXTag,{name:"h2",components:n},"\xc9tape 2 - je pr\xe9cise mon projet et ma commune d'habitation"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Pourquoi ma ville n'est-elle pas pr\xe9sente parmi les partenaires\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"En tant que start-up d'\xe9tat, \xabPermis de construire facile\xbb s'attaque au\nd\xe9fi de la d\xe9mat\xe9rialisation des demandes d'autorisation d'urbanisme en\ntravaillant au plus pr\xe8s avec les utilisateurs : une partie de nos\nutilisateurs sont les villes qui instruisent les dossiers. Celles que\nvous voyez appara\xeetre travaillent d\xe9j\xe0 avec nous pour construire les\noutils de d\xe9mat\xe9rialisation."),s.a.createElement(o.MDXTag,{name:"p",components:n},"N'h\xe9sitez pas \xe0 sugg\xe9rer \xe0 votre mairie de nous contacter pour\nparticiper \xe0 cette exp\xe9rience !"),s.a.createElement(o.MDXTag,{name:"h2",components:n},"\xc9tape 3 - je compl\xe8te le formulaire sp\xe9cifique et d\xe9pose les PJ obligatoires"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Pourquoi toutes ces questions sur mon projet\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Pour d\xe9poser votre dossier, vous devez remplir un ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"formulaire")," dont\nles questions varient en fonction de votre projet."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Les informations requises ne sortent pas de nulle part : elles sont le\nreflet des diff\xe9rents formulaires CERFA utilis\xe9s aujourd'hui dans\nl'administration. Ces informations sont ensuites utilis\xe9es par les\nservices en charge d'\xe9tudier le dossier afin de d\xe9terminer s'il est ou\nnon coh\xe9rent vis-\xe0-vis des r\xe8gles d'urbanismes locales et nationales\n(ex. si vous \xeates dans une zone o\xf9 coexistent des monuments historiques\nou si une coh\xe9rence est recherch\xe9e en mati\xe8re d'urbanisme). Ces r\xe8gles\nsont pr\xe9cis\xe9es dans les Plans Locaux d'Urbanisme (PLU)."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Quelles sont les pi\xe8ces jointes obligatoires\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Les pi\xe8ces-jointes permettent d'\xe9tudier votre dossier : est-il conforme\naux exigences d'urbanisme local ? En fonction du projet, des pi\xe8ces\ndiff\xe9rentes pourraient vous \xeatre demand\xe9es."),s.a.createElement(o.MDXTag,{name:"p",components:n},s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"Les pi\xe8ces les plus courantes")),s.a.createElement(o.MDXTag,{name:"p",components:n},"N\xb0 Nom Description et pr\xe9cisions"),s.a.createElement(o.MDXTag,{name:"hr",components:n}),s.a.createElement(o.MDXTag,{name:"p",components:n},"DP1 Plan de situation du terrain Ce plan permet de situer le terrain sur la commune et de localiser sa zone pour identifier les r\xe8gles d'urbanisme applicables\nDP2 Plan de masse cot\xe9 dans les 3 dimensions ","-"," \xc0 fournir si votre projet modifie le profil du terrain (exemple : piscine enterr\xe9e...)\nDP3 Plan en coupe pr\xe9cisant l'implantation de la construction par rapport au profil du terrain Ce plan montre le profil du terrain : permet de voir les volumes des constructions et les implantations par rapport au profil. \xc0 fournir si votre projet les modifie (exemple\xa0: pose d'une fen\xeatre de toit, cr\xe9ation d'une porte..). Inutile pour un simple ravalement de fa\xe7ade.\nDP4 Plan des fa\xe7ades et des toitures Ces plans permettent d'appr\xe9cier l'aspect ext\xe9rieur de la construction ainsi que ses hauteurs."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si votre projet si votre projet est ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"visible depuis l'espace public"),"\nou s'il se situe dans une zone dite ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"Architectes de Batiments de\nFrance (ABF)")," (c'est souvent \xe0 proximit\xe9 de monuments historiques),\nles pi\xe8ces qui suivent sont souvent demand\xe9es."),s.a.createElement(o.MDXTag,{name:"p",components:n},"N\xb0 Nom Description et pr\xe9cisions"),s.a.createElement(o.MDXTag,{name:"hr",components:n}),s.a.createElement(o.MDXTag,{name:"p",components:n},"DP6 Document graphique 3D Permet d'appr\xe9cier l'insertion du projet de construction dans son environnement (depuis l'espace public)\nDP7 Photographie permettant de situer le terrain dans l'environnement proche Pour voir les constructions proches, sauf si vous justifiez qu'aucune photographie de loin n'est possible\nDP8 Photographie permettant de situer le terrain dans le paysage lointain Pour voir les constructions proches (si existantes)\nDP11 Notice faisant apparaitre les mat\xe9riaux utilis\xe9s et les modalit\xe9s d'ex\xe9cution des travaux"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Pourquoi est-ce important de conna\xeetre la surface de plancher\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"La surface de plancher est \xe0 d\xe9finir pr\xe9cis\xe9ment lors de l'\xe9laboration\nd'une demande d'autorisation car elle d\xe9termine le type d'autorisation\nque vous devez obtenir. Elle correspond \xe0 la somme des surfaces de\nchaque niveau clos et couvert. Ces surfaces sont comptabilis\xe9es \xe0 partir\ndu nu int\xe9rieur des murs, c'est-\xe0-dire sans l'\xe9paisseur des murs\next\xe9rieurs."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Surface de plancher"),s.a.createElement(o.MDXTag,{name:"p",components:n},s.a.createElement(o.MDXTag,{name:"img",components:n,parentName:"p",props:{src:"/static/images/faq/surface-de-plancher.png",alt:"Surface de plancher"}})),s.a.createElement(o.MDXTag,{name:"p",components:n},"Quelle diff\xe9rence avec la ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"surface d'emprise au sol"),"\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"La surface d'emprise au sol correspond \xe0 la projection verticale au sol\ndes constructions."),s.a.createElement(o.MDXTag,{name:"p",components:n},s.a.createElement(o.MDXTag,{name:"img",components:n,parentName:"p",props:{src:"/static/images/faq/emprise-au-sol.png",alt:"Emprise au sol"}})),s.a.createElement(o.MDXTag,{name:"h2",components:n},"\xc9tape 4 - je valide le d\xe9p\xf4t de mon dossier 100% en ligne {#etape4}"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Le d\xe9p\xf4t en ligne est-il juridiquement valable\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Oui ! La ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"confirmation et la transmission")," du formulaire (= d\xe9p\xf4t\n\xe9lectronique) vaut ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"signature et \xe9quivaut au d\xe9p\xf4t physique"),". En\nrevanche, l'envoi d'un dossier via le service ne garantit pas\nl'acceptation d'une demande. De plus, le d\xe9lai officiel de traitement du\ndossier ne d\xe9marrera un jour ouvr\xe9 \xe0 partir de la date de la r\xe9ception\nde l'accus\xe9 d'enregistrement \xe9lectronique (ex. si vous d\xe9posez votre\ndemande un samedi \xe0 19h40, le d\xe9lai ne d\xe9marrera qu'\xe0 partir du lundi\n8h40)."),s.a.createElement(o.MDXTag,{name:"p",components:n},"En application de l'article L.112-9 du Code des Relations entre le\nPublic et l'Administration (CRPA), lorsqu'elle a mis en place un\nt\xe9l\xe9service r\xe9serv\xe9 \xe0 l'accomplissement de certaines d\xe9marches\nadministratives, une administration n'est r\xe9guli\xe8rement saisie par voie\n\xe9lectronique que par l'usage de ce t\xe9l\xe9service."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si vous souhaitez plus d'infos sur les aspects juridiques, n'h\xe9sitez pas\n\xe0 vous plonger dans les ",s.a.createElement(o.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"%7B%7B%20path('route_static_cgu')%20%7D%7D"}},"Conditions G\xe9n\xe9rales\nd'Utilisation")," qui\nd\xe9taillent ces aspects !"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Puis-je toujours d\xe9poser mon dossier en Mairie\xa0?"),s.a.createElement(o.MDXTag,{name:"h4",components:n},"...et si je n'ai pas de scanner\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Il est toujours possible de d\xe9poser votre dossier en version papier au\nguichet unique de votre mairie en respectant les consignes pr\xe9cis\xe9es\ndans les formulaires (Cerfa)."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si vous n'avez pas de scanner : il est tout \xe0 fait possible de faire des\nphotos de vos plans. Faites juste attention \xe0 la qualit\xe9 et \xe0 la couleur\n(les instructeurs doivent pouvoir les comprendre facilement) !"),s.a.createElement(o.MDXTag,{name:"h2",components:n},"\xc9tape 5 - je suis le traitement de ma demande"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Qui est en charge d'instruire ma d\xe9claration pr\xe9alable de travaux\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"\xc7a d\xe9pend ! Un service instructeur se charge d'\xe9tudier les dossiers. Des\nfois, ce service instructeur est au niveau de la ville elle-m\xeame, des\nfois au niveau d'un regroupement de communes... de nombreuses\nconfigurations existent car les villes choisissent comment elles veulent\ns'organiser."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Par ailleurs, en fonction de votre projet et de ses besoins, les\nservices instructeurs peuvent solliciter l'avis d'un certain nombre de\nservice externes pouvant allonger les d\xe9lais.:"),s.a.createElement(o.MDXTag,{name:"ul",components:n},s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"Architectes des b\xe2timents de France : si votre projet a lieu dans\nles abords d'un monument historique ou dans une zone prot\xe9g\xe9e, ils\ndoivent donner leur accord"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"Pompiers : pensent-ils que ce projet pose probl\xe8me en cas\nd'incendie, ici ou chez des voisins ?"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"R\xe9seaux d'eau, d'\xe9lectricit\xe9 : quel est l'impact de ce projet sur\nles raccordements, ici et dans le quartier ?"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"... et d'autres encore, en fonction de votre projet et de ses\ncaract\xe9ristiques !")),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Puis-je \xe9changer directement avec le service qui instruit si j'ai une question\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Oui, si besoin vous pourrez communiquer directement par le biais de la\nmessagerie interne avec le service qui \xe9tudie votre dossier."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Quel est le d\xe9lai de traitement de ma demande\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Le d\xe9lai d'instruction est de ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"1 mois")," \xe0 partir de la r\xe9ception de\nvotre demande."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si votre dossier n'est pas complet, la mairie a 1 mois pour r\xe9clamer\nles pi\xe8ces manquantes. Vous avez alors 3 mois pour compl\xe9ter votre\ndossier. Si vous ne le faites pas, votre DP est consid\xe9r\xe9e comme\nrejet\xe9e.."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Le d\xe9lai d'instruction peut \xeatre modifi\xe9 pendant un d\xe9lai d'un mois en\nfonction de la localisation de votre projet."),s.a.createElement(o.MDXTag,{name:"p",components:n},"En effet, dans certains cas, notamment lorsque le terrain est situ\xe9 dans\nun secteur sauvegard\xe9 (ex. zone patrimoniale, site Nature N2000, etc.),\nle d\xe9lai d'instruction peut \xeatre plus long. Vous pouvez vous renseigner\nsur ce d\xe9lai :"),s.a.createElement(o.MDXTag,{name:"ul",components:n},s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"aupr\xe8s de votre mairie"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"ou en \xe9changeant via le service avec le service en charge de\nl'instruction une fois votre demande d\xe9pos\xe9e")),s.a.createElement(o.MDXTag,{name:"h2",components:n},"Etape 6 - je r\xe9cup\xe8re la d\xe9cision \xe0 ma demande"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Quel est le document qui atteste de l'acceptation de mon projet\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Lorsque la mairie accepte votre projet tel qui est d\xe9crit dans la DP, sa\nd\xe9cision prend la forme d'un arr\xeat\xe9. Cette d\xe9cision \xe0 partir du moment\no\xf9 elle est consultable \xe0 partir du t\xe9l\xe9service, qu'elle comporte les\npr\xe9noms, nom et qualit\xe9 du l'autorit\xe9 qui l'a d\xe9livr\xe9e, elle est alors\ndispens\xe9e de signature."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Ci-apr\xe8s, la base juridique de ce point de droit."),s.a.createElement(o.MDXTag,{name:"p",components:n},"En application de l'article L212-2 du CRPA, sont dispens\xe9s de la\nsignature de leur auteur, d\xe8s lors qu'ils auquel celui-ci appartient,\nles actes suivants :"),s.a.createElement(o.MDXTag,{name:"p",components:n},"1\xb0 Les d\xe9cisions administratives qui sont notifi\xe9es au public par\nl'interm\xe9diaire d'un t\xe9l\xe9service conforme \xe0 l'article L. 112-9 et aux\narticles 9 \xe0 12 de l'ordonnance n\xb0 2005-1516 du 8 d\xe9cembre 2005\nrelative aux \xe9changes \xe9lectroniques entre les usagers et les autorit\xe9s\nadministratives et entre les autorit\xe9s administratives ainsi que les\nactes pr\xe9paratoires \xe0 ces d\xe9cisions ;"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Qu'est-ce que le tacite\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si vous n'avez pas de r\xe9ponse de la mairie au terme du d\xe9lai\nd'instruction qu'elle vous a indiqu\xe9, cela signifie qu'elle ne\ns'oppose pas \xe0 votre projet. Vous b\xe9n\xe9ficiez donc d'une d\xe9cision\n",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"tacite")," dite aussi ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"d\xe9cision de non-opposition")," \xe0 la demande\npr\xe9alable."),s.a.createElement(o.MDXTag,{name:"p",components:n},"En pratique, nous vous recommandons de r\xe9clamer \xe0 la mairie un\ncertificat attestant son absence d'opposition."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Cela vous permet :"),s.a.createElement(o.MDXTag,{name:"ul",components:n},s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"de disposer d'une preuve de la r\xe9alit\xe9 de la d\xe9cision tacite par\nlaquelle la mairie a d\xe9cid\xe9 de ne pas s'opposer \xe0 votre projet,"),s.a.createElement(o.MDXTag,{name:"li",components:n,parentName:"ul"},"et de faire valoir vos droits (obtention d'un pr\xeat, souscription\nd'assurances).")),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Quels sont les motifs de refus potentiels\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Le non respect des r\xe8gles contenues dans un document d'urbanisme peut\nentra\xeener le refus de la demande."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Avant le d\xe9p\xf4t de sa demande, il est donc important de v\xe9rifier la\nfaisabilit\xe9 juridique de sa demande (cf. question ",s.a.createElement(o.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"#faisabilite"}},'"O\xf9 v\xe9rifier la\nfaisabilit\xe9 de mon projet ?"'),")"),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Quels sont mes recours possibles en cas de refus de mon projet\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si vous recevez une d\xe9cision de refus qui indique que la mairie\ns'oppose \xe0 votre projet tel qu'il est d\xe9crit dans votre demande il est\npossible de faire un recours. Un recours consiste \xe0 re-demander \xe0\nl'autorit\xe9 responsable de revoir sa position. Pour appuyer votre\nrecours, vous devez exposer clairement les raisons qui vous permettent\nde justifier votre droit \xe0 l'obtention d'une DP et notamment les\ndocuments qui vous semble pertinent."),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si un recours est souvent fait par lettre recommand\xe9e avec avis de\nr\xe9ception envoy\xe9e dans les 2 mois qui suivent la d\xe9cision, un\nt\xe9l\xe9service peut vous proposer de d\xe9poser un tel recours par voie\nd\xe9mat\xe9rialis\xe9e !"),s.a.createElement(o.MDXTag,{name:"p",components:n},"Si vous recevez un nouveau refus, vous avez 2 mois \xe0 partir de la\nnotification du refus pour saisir le tribunal administratif par lettre\nrecommand\xe9e avec avis de r\xe9ception."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Quelle est la dur\xe9e de validit\xe9 d'une autorisation\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},"La dur\xe9e de validit\xe9 de la d\xe9cision accordant la DP (ou la d\xe9cision\ntacite) est de ",s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"3 ans"),". Si vos travaux n'ont pas commenc\xe9 avant\nl'expiration de ce d\xe9lai, votre DP n'est plus valable et il faudra\nrefaire une demande. Important : ce d\xe9lai de 3 ans peut \xeatre prolong\xe9 de\n2 fois 1 an."),s.a.createElement(o.MDXTag,{name:"h3",components:n},"Puis-je commencer mes travaux avant d'avoir re\xe7u la d\xe9cision\xa0?"),s.a.createElement(o.MDXTag,{name:"p",components:n},s.a.createElement(o.MDXTag,{name:"strong",components:n,parentName:"p"},"Non"),". N\xe9anmoins, une fois que votre d\xe9claration est accept\xe9e, vous\nn'avez pas besoin d'informer la mairie du commencement de vos travaux\ncontrairement au permis de construire."))}}}]);
//# sourceMappingURL=4.a82bcccf.chunk.js.map