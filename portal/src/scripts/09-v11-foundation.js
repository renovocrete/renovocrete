/* RENOVO CRETE V11 — regional data, permissions, numbering and translations */
const RC11_VERSION='V11.0 GLOBAL';
const RC11_REGION_SEED=[
 {id:'CARIBBEAN',code:'CAR',flag:'🌴',names:{en:'Caribbean',fr:'Caraïbe',es:'Caribe'},territories:[
  ['car-bahamas','BHS','Bahamas','Nassau'],['car-jamaica','JAM','Jamaica','Kingston'],['car-puerto-rico','PRI','Puerto Rico','San Juan'],['car-saint-martin','SXM','Saint-Martin','Marigot'],['car-trinidad-tobago','TTO','Trinidad and Tobago','Charleville'],['car-saint-barthelemy','SBH','Saint-Barthélemy','Gustavia'],['car-guadeloupe','GLP','Guadeloupe','Pointe-à-Pitre'],['car-martinique','MTQ','Martinique','Fort-de-France'],['car-anguilla','AIA','Anguilla','The Valley'],['car-saint-kitts-nevis','KNA','Saint Kitts and Nevis','Basseterre'],['car-barbados','BRB','Barbados','Bridgetown']
 ]},
 {id:'USA',code:'USA',flag:'🇺🇸',names:{en:'United States',fr:'États-Unis',es:'Estados Unidos'},territories:[
  ['usa-alaska','AK','Alaska','Anchorage'],['usa-arkansas','AR','Arkansas','Hot Springs'],['usa-northern-california','NCAL','Northern California','Merced'],['usa-southern-california','SCAL','Southern California','Los Angeles'],['usa-colorado','CO','Colorado','Denver'],['usa-florida','FL','Florida','Freeport'],['usa-georgia','GA','Georgia','Augusta'],['usa-hawaii','HI','Hawaii',''],['usa-central-illinois','CIL','Central Illinois','Clinton'],['usa-northern-illinois','NIL','Northern Illinois','Chicago'],['usa-indiana-hq','INHQ','Indiana — USA Headquarters','Valparaiso'],['usa-southern-indiana','SIN','Southern Indiana','Evansville'],['usa-kentucky','KY','Kentucky','Louisville'],['usa-massachusetts','MA','Massachusetts','Boston'],['usa-michigan','MI','Michigan','Lake Orion'],['usa-minnesota','MN','Minnesota','Bloomington'],['usa-montana','MT','Montana','Missoula'],['usa-new-york','NY','New York','Wappingers Falls'],['usa-ohio','OH','Ohio','Dayton'],['usa-pennsylvania','PA','Pennsylvania','Bristol'],['usa-puerto-rico','PR','Puerto Rico','San Juan'],['usa-tennessee','TN','Tennessee','Nashville'],['usa-north-texas','NTX','North Texas','Dallas–Fort Worth'],['usa-south-texas','STX','South Texas','Multiple locations'],['usa-west-virginia','WV','West Virginia','Fayetteville']
 ]},
 {id:'LATAM',code:'LAT',flag:'🌎',names:{en:'Latin America',fr:'Amérique latine',es:'América Latina'},territories:[
  ['latam-costa-rica','CRI','Costa Rica','San José'],['latam-el-salvador','SLV','El Salvador','San Salvador'],['latam-mexico','MEX','Mexico','Multiple locations']
 ]},
 {id:'CANADA',code:'CAN',flag:'🇨🇦',names:{en:'Canada',fr:'Canada',es:'Canadá'},territories:[
  ['can-central-ontario','CON','Central Ontario','Collingwood'],['can-eastern-ontario','EON','Eastern Ontario','Cornwall']
 ]},
 {id:'EUROPE',code:'EUR',flag:'🇪🇺',names:{en:'Europe',fr:'Europe',es:'Europa'},territories:[
  ['eur-germany','DEU','Germany','Villmar'],['eur-bosnia','BIH','Bosnia and Herzegovina','Sarajevo'],['eur-croatia','HRV','Croatia','Makarska'],['eur-spain','ESP','Spain','Madrid'],['eur-ireland','IRL','Ireland','Kilcoole'],['eur-united-kingdom','GBR','United Kingdom','Birmingham'],['eur-serbia','SRB','Serbia','Belgrade'],['eur-slovenia','SVN','Slovenia','Velenje']
 ]},
 {id:'ASIA',code:'ASI',flag:'🌏',names:{en:'Asia',fr:'Asie',es:'Asia'},territories:[
  ['asia-myanmar','MMR','Myanmar','Yangon'],['asia-vietnam','VNM','Vietnam','Ho Chi Minh City']
 ]},
 {id:'OCEANIA',code:'OCE',flag:'🌊',names:{en:'Oceania',fr:'Océanie',es:'Oceanía'},territories:[
  ['oce-australia','AUS','Australia','Brisbane']
 ]}
];
const RC11_CORE_SXM_NAMES=['Jean Jude PAUL','Yonathan FAURE','Olsen NELSON','Guy PAUL'];
const RC11_ADMIN_SEED=[
 {id:'admin-jean-jude',name:'Jean Jude PAUL',email:'',regionId:'CARIBBEAN',territoryId:'car-saint-martin',level:'caribbean_hq',active:true,protected:true},
 {id:'admin-yonathan',name:'Yonathan FAURE',email:'',regionId:'CARIBBEAN',territoryId:'car-saint-martin',level:'caribbean_hq',active:true,protected:true},
 {id:'admin-olsen',name:'Olsen NELSON',email:'',regionId:'CARIBBEAN',territoryId:'car-saint-martin',level:'caribbean_hq',active:true,protected:true},
 {id:'admin-guy',name:'Guy PAUL',email:'',regionId:'CARIBBEAN',territoryId:'car-saint-martin',level:'caribbean_hq',active:true,protected:true},
 {id:'admin-usa-hq',name:'USA HQ — Indiana',email:'',regionId:'USA',territoryId:'usa-indiana-hq',level:'global_hq',active:true,protected:true}
];
const RC11_I18N={
 en:{
  app:'RENOVO CRETE Professional Portal',login:'Sign in',email:'Email address',password:'Password',signIn:'Sign in',logout:'Sign out',backAdmin:'Back to administration',localDemo:'Local prototype',adminDemo:'Administrator',professionalDemo:'Professional',
  navHome:'Home',navProfessionals:'Professionals & partners',navOrders:'Global orders',navInvoices:'Invoices',navReceivables:'Unpaid & instalments',navPortfolio:'Client portfolio',navLoyalty:'Loyalty & categories',navReferrals:'Referrals',navSystems:'System library',navMessages:'Professional messaging',navOmnichannel:'Email, WhatsApp, SMS & calls',navCatalog:'Catalog & pricing',navRegions:'Regions & territories',navImports:'Imports / exports',navAudit:'Audit log',navAdmins:'Administrators',navSettings:'Settings',navFaq:'FAQ',navCalculator:'System calculator',navVisualizer:'Floor visualizer',navCart:'Product order',navSimulations:'Saved simulations',navMyOrders:'My orders',navMyInvoices:'My invoices',navClientCatalog:'Catalog',navSupport:'Customer service',
  allRegions:'All regions',regionalScope:'Regional scope',globalControl:'Global operating control',regionalAccess:'Regional access',protectedSxm:'Saint-Martin protected access',liveData:'Live data in this device',refreshLive:'Live / instant',refreshHourly:'Refresh every hour',refreshDaily:'Refresh every 24 hours',
  revenue:'Revenue collected',orders:'Orders',professionals:'Professionals',balance:'Outstanding balance',latestOrders:'Latest orders requiring action',latestOrdersHelp:'Paid and validated orders leave this operational queue automatically.',noOrders:'No order requires action.',previous:'Previous',next:'Next',page:'Page',of:'of',
  regionsTitle:'Regions & territory control',regionsIntro:'Monitor every operating region, its revenue, sales, professionals and orders from one governed workspace.',territories:'Territories',addTerritory:'Add territory',editTerritory:'Edit territory',deleteTerritory:'Delete territory',region:'Region',territory:'Territory',country:'Country / territory',city:'City / hub',code:'Code',save:'Save',cancel:'Cancel',delete:'Delete',edit:'Edit',add:'Add',active:'Active',inactive:'Inactive',
  adminsTitle:'Administrators & access governance',adminsIntro:'Manage administrators by region while protecting Saint-Martin and USA Headquarters scopes.',addAdmin:'Add administrator',role:'Access level',globalHq:'USA Headquarters — global',caribbeanHq:'Saint-Martin Caribbean HQ',regionalAdmin:'Regional administrator',readOnly:'Read only',noPermission:'Your current scope does not allow this action.',coreOnly:'Only Jean Jude PAUL, Yonathan FAURE, Olsen NELSON and Guy PAUL may hold Saint-Martin Caribbean HQ access.',
  professionalsTitle:'Professionals & partners',professionalsIntro:'Segment, manage and locate every professional within the territories you are authorized to access.',addProfessional:'Add professional',company:'Company',contact:'Contact',search:'Search',all:'All',view:'Display',list:'List',medium:'Medium cards',large:'Large cards',open:'Open',deactivate:'Deactivate',activate:'Activate',noProfessionals:'No professional matches these filters.',
  invoicesTitle:'Invoices',invoicesIntro:'Invoices are created only after confirmed payment and receive a territory-specific sequential number.',invoiceNo:'Invoice number',orderNo:'Order number',client:'Client',date:'Date',customDates:'Custom dates',system:'System',amount:'Amount',environment:'Environment',interior:'Interior',exterior:'Exterior',paid:'Paid',downloadPrint:'Open / Print PDF',noInvoices:'No paid invoice matches these filters.',invoice:'Invoice',issuedOn:'Issued on',billTo:'Bill to',description:'Description',quantity:'Quantity',unitPrice:'Unit price',total:'Total',paymentConfirmed:'Payment confirmed',taxNote:'Taxes and legal invoice fields must be configured for the issuing entity before production use.',
  orderQueue:'Operational order queue',orderStatus:'Order status',paymentStatus:'Payment status',project:'Project',paidValidatedHidden:'Paid and validated orders are removed from this dashboard list.',
  receivablesTitle:'Unpaid & instalment payments',receivablesIntro:'Prioritize outstanding balances, overdue payments and active instalment schedules.',remaining:'Remaining',overdue:'Overdue',instalments:'Instalments',
  portfolioTitle:'Client portfolio',portfolioIntro:'Numbered portfolio by client value, collections and outstanding balance.',rank:'No.',purchases:'Purchases',collected:'Collected',
  loyaltyTitle:'Loyalty & client categories',loyaltyIntro:'Annual classification across three achievement levels: over €100,000, €250,000 and €500,000.',year:'Year',premium:'Premium',prestige:'Prestige',elite:'Elite',standard:'Standard',thresholds:'Annual thresholds',saveThresholds:'Save thresholds',
  systemsTitle:'System library',systemsIntro:'Add, edit, number and reorder technical systems. Drag cards to change publication order.',addSystem:'Add system',layers:'Layers',photo:'Photo',usage:'Use / description',drag:'Drag to reorder',archive:'Archive',restore:'Restore',draft:'Draft',published:'Published',template:'Technical template',
  catalogTitle:'Catalog & pricing',catalogIntro:'The resale EUR and USD values are the prices displayed in every system calculator.',ecsCost:'ECS price — excluding fees',resalePrice:'Resale price',exchangeRate:'Manual EUR → USD rate',marketRate:'Current market reference',refreshRate:'Refresh market rate',applyRate:'Apply manual rate',updated:'Updated',family:'Family',pack:'Pack',priceSaved:'Pricing saved.',
  omniTitle:'Email, WhatsApp, SMS & phone',omniIntro:'Contact professionals through direct channels or secure server-side connectors for Brevo, Twilio and HubSpot.',recipient:'Recipient',message:'Message',subject:'Subject',compose:'Compose',sendEmail:'Email',sendWhatsapp:'WhatsApp',sendSms:'SMS',call:'Phone call',connections:'Connections',connected:'Configured',notConnected:'Not configured',saveConnections:'Save connections',webhookOnly:'Store only secure backend webhook URLs here. Never paste API keys into this mobile file.',hubspotSync:'HubSpot CRM sync',brevo:'Brevo email',twilio:'Twilio SMS / WhatsApp',
  clientHome:'Professional dashboard',clientHomeIntro:'See what requires attention and track your purchasing activity at a glance.',urgentPayment:'Payment required',urgentPaymentHelp:'One or more orders are waiting for payment. Pay or contact customer service to avoid delays.',payNow:'Pay now',monthlyActivity:'Monthly purchase activity',recentOrders:'Recent orders',loyaltyLevel:'Loyalty level',
  calculatorLock:'Protected quotation workflow',calculatorLockHelp:'A professional can calculate and add products to an order, but cannot save or export a PDF before payment. The numbered invoice appears after confirmed payment.',
  supportChannels:'Contact customer service',supportChannelsHelp:'Choose the quickest channel for your request.',
  securityTitle:'Production security required',securityText:'This standalone file demonstrates workflows and access rules on one device. Global uniqueness, real-time synchronization, authentication, payments and third-party messaging require a secure server database and transactional APIs.',
  filter:'Filter',reset:'Reset',from:'From',to:'To',noResults:'No result',actions:'Actions',yes:'Yes',no:'No',status:'Status',details:'Details',number:'No.'
 },
 fr:{
  app:'Portail professionnel RENOVO CRETE',login:'Connexion',email:'Adresse e-mail',password:'Mot de passe',signIn:'Se connecter',logout:'Déconnexion',backAdmin:'Retour administration',localDemo:'Prototype local',adminDemo:'Administrateur',professionalDemo:'Professionnel',
  navHome:'Accueil',navProfessionals:'Professionnels et partenaires',navOrders:'Commandes globales',navInvoices:'Factures',navReceivables:'Impayés & échéances',navPortfolio:'Portefeuille client',navLoyalty:'Fidélité & catégories',navReferrals:'Parrainage',navSystems:'Bibliothèque des systèmes',navMessages:'Messagerie professionnelle',navOmnichannel:'E-mail, WhatsApp, SMS & appels',navCatalog:'Catalogue & tarifs',navRegions:'Régions & territoires',navImports:'Imports / exports',navAudit:'Journal d’audit',navAdmins:'Administrateurs',navSettings:'Paramètres',navFaq:'FAQ',navCalculator:'Calculateur par système',navVisualizer:'Visualiseur du sol',navCart:'Commande produits',navSimulations:'Simulations enregistrées',navMyOrders:'Mes commandes',navMyInvoices:'Mes factures',navClientCatalog:'Catalogue',navSupport:'Service client',
  allRegions:'Toutes les régions',regionalScope:'Périmètre régional',globalControl:'Pilotage opérationnel mondial',regionalAccess:'Accès régional',protectedSxm:'Accès Saint-Martin protégé',liveData:'Données immédiates sur cet appareil',refreshLive:'Direct / instantané',refreshHourly:'Actualisation chaque heure',refreshDaily:'Actualisation toutes les 24 h',revenue:'CA encaissé',orders:'Commandes',professionals:'Professionnels',balance:'Solde restant',latestOrders:'Dernières commandes à traiter',latestOrdersHelp:'Les commandes payées et validées quittent automatiquement cette file opérationnelle.',noOrders:'Aucune commande à traiter.',previous:'Précédent',next:'Suivant',page:'Page',of:'sur',
  regionsTitle:'Régions & pilotage territorial',regionsIntro:'Suivez chaque région, son CA, ses ventes, ses professionnels et ses commandes depuis un espace gouverné.',territories:'Territoires',addTerritory:'Ajouter un territoire',editTerritory:'Modifier le territoire',deleteTerritory:'Supprimer le territoire',region:'Région',territory:'Territoire',country:'Pays / territoire',city:'Ville / hub',code:'Code',save:'Enregistrer',cancel:'Annuler',delete:'Supprimer',edit:'Modifier',add:'Ajouter',active:'Actif',inactive:'Inactif',
  adminsTitle:'Administrateurs & gouvernance des accès',adminsIntro:'Gérez les administrateurs par région tout en protégeant les périmètres Saint-Martin et USA Headquarters.',addAdmin:'Ajouter un administrateur',role:'Niveau d’accès',globalHq:'USA Headquarters — mondial',caribbeanHq:'HQ Caraïbe Saint-Martin',regionalAdmin:'Administrateur régional',readOnly:'Lecture seule',noPermission:'Votre périmètre actuel ne permet pas cette action.',coreOnly:'Seuls Jean Jude PAUL, Yonathan FAURE, Olsen NELSON et Guy PAUL peuvent disposer de l’accès HQ Caraïbe Saint-Martin.',
  professionalsTitle:'Professionnels et partenaires',professionalsIntro:'Segmentez, gérez et localisez chaque professionnel dans les territoires autorisés.',addProfessional:'Ajouter un professionnel',company:'Société',contact:'Contact',search:'Rechercher',all:'Tous',view:'Affichage',list:'Liste',medium:'Fiches moyennes',large:'Grandes fiches',open:'Ouvrir',deactivate:'Désactiver',activate:'Activer',noProfessionals:'Aucun professionnel ne correspond aux filtres.',
  invoicesTitle:'Factures',invoicesIntro:'Les factures sont créées uniquement après paiement confirmé et reçoivent un numéro séquentiel propre au territoire.',invoiceNo:'Numéro de facture',orderNo:'Numéro de commande',client:'Client',date:'Date',customDates:'Dates personnalisées',system:'Système',amount:'Montant',environment:'Environnement',interior:'Intérieur',exterior:'Extérieur',paid:'Payé',downloadPrint:'Ouvrir / Imprimer PDF',noInvoices:'Aucune facture payée ne correspond aux filtres.',invoice:'Facture',issuedOn:'Émise le',billTo:'Facturé à',description:'Description',quantity:'Quantité',unitPrice:'Prix unitaire',total:'Total',paymentConfirmed:'Paiement confirmé',taxNote:'Les taxes et mentions légales doivent être configurées pour l’entité émettrice avant mise en production.',
  orderQueue:'File opérationnelle des commandes',orderStatus:'Statut commande',paymentStatus:'Statut paiement',project:'Projet',paidValidatedHidden:'Les commandes payées et validées sont retirées de cette liste d’accueil.',receivablesTitle:'Impayés & paiements échelonnés',receivablesIntro:'Priorisez les soldes restants, les retards et les échéanciers actifs.',remaining:'Reste dû',overdue:'En retard',instalments:'Échéances',portfolioTitle:'Portefeuille client',portfolioIntro:'Portefeuille numéroté par valeur client, encaissements et solde.',rank:'N°',purchases:'Achats',collected:'Encaissé',loyaltyTitle:'Fidélité & catégories clients',loyaltyIntro:'Classement annuel selon trois niveaux : plus de 100 000 €, 250 000 € et 500 000 €.',year:'Année',premium:'Premium',prestige:'Prestige',elite:'Elite',standard:'Standard',thresholds:'Seuils annuels',saveThresholds:'Enregistrer les seuils',
  systemsTitle:'Bibliothèque des systèmes',systemsIntro:'Ajoutez, modifiez, numérotez et réordonnez les systèmes techniques. Faites glisser les fiches pour changer l’ordre.',addSystem:'Ajouter un système',layers:'Couches',photo:'Photo',usage:'Usage / description',drag:'Glisser pour réordonner',archive:'Archiver',restore:'Restaurer',draft:'Brouillon',published:'Publié',template:'Modèle technique',catalogTitle:'Catalogue & tarifs',catalogIntro:'Les valeurs de revente EUR et USD sont les prix affichés dans chaque calculateur système.',ecsCost:'Prix ECS — hors frais',resalePrice:'Prix revente',exchangeRate:'Taux manuel EUR → USD',marketRate:'Référence marché actuelle',refreshRate:'Actualiser le taux marché',applyRate:'Appliquer le taux manuel',updated:'Actualisé',family:'Famille',pack:'Conditionnement',priceSaved:'Tarifs enregistrés.',
  omniTitle:'E-mail, WhatsApp, SMS & téléphone',omniIntro:'Contactez les professionnels directement ou via des connecteurs serveur sécurisés pour Brevo, Twilio et HubSpot.',recipient:'Destinataire',message:'Message',subject:'Objet',compose:'Composer',sendEmail:'E-mail',sendWhatsapp:'WhatsApp',sendSms:'SMS',call:'Appel',connections:'Connexions',connected:'Configuré',notConnected:'Non configuré',saveConnections:'Enregistrer les connexions',webhookOnly:'Enregistrez ici uniquement des URL de webhooks serveur sécurisés. Ne placez jamais de clés API dans ce fichier mobile.',hubspotSync:'Synchronisation HubSpot CRM',brevo:'E-mail Brevo',twilio:'SMS / WhatsApp Twilio',clientHome:'Tableau de bord professionnel',clientHomeIntro:'Identifiez les actions prioritaires et suivez votre activité d’achat.',urgentPayment:'Paiement urgent',urgentPaymentHelp:'Une ou plusieurs commandes attendent un paiement. Payez ou contactez le service client pour éviter un retard.',payNow:'Payer',monthlyActivity:'Activité d’achat mensuelle',recentOrders:'Commandes récentes',loyaltyLevel:'Niveau fidélité',calculatorLock:'Parcours de commande protégé',calculatorLockHelp:'Le professionnel peut calculer et ajouter des produits à une commande, mais ne peut ni enregistrer ni exporter un PDF avant paiement. La facture numérotée apparaît après confirmation du paiement.',supportChannels:'Contacter le service client',supportChannelsHelp:'Choisissez le canal le plus rapide pour votre demande.',securityTitle:'Sécurité de production requise',securityText:'Ce fichier autonome démontre les parcours et droits d’accès sur un appareil. L’unicité mondiale, la synchronisation, l’authentification, les paiements et les messageries tierces exigent une base serveur sécurisée et des API transactionnelles.',filter:'Filtrer',reset:'Réinitialiser',from:'Du',to:'Au',noResults:'Aucun résultat',actions:'Actions',yes:'Oui',no:'Non',status:'Statut',details:'Détails',number:'N°'
 },
 es:{
  app:'Portal profesional RENOVO CRETE',login:'Iniciar sesión',email:'Correo electrónico',password:'Contraseña',signIn:'Conectarse',logout:'Cerrar sesión',backAdmin:'Volver a administración',localDemo:'Prototipo local',adminDemo:'Administrador',professionalDemo:'Profesional',navHome:'Inicio',navProfessionals:'Profesionales y socios',navOrders:'Pedidos globales',navInvoices:'Facturas',navReceivables:'Impagos y plazos',navPortfolio:'Cartera de clientes',navLoyalty:'Fidelidad y categorías',navReferrals:'Referidos',navSystems:'Biblioteca de sistemas',navMessages:'Mensajería profesional',navOmnichannel:'Email, WhatsApp, SMS y llamadas',navCatalog:'Catálogo y precios',navRegions:'Regiones y territorios',navImports:'Importar / exportar',navAudit:'Registro de auditoría',navAdmins:'Administradores',navSettings:'Configuración',navFaq:'Preguntas',navCalculator:'Calculadora por sistema',navVisualizer:'Visualizador de suelo',navCart:'Pedido de productos',navSimulations:'Simulaciones guardadas',navMyOrders:'Mis pedidos',navMyInvoices:'Mis facturas',navClientCatalog:'Catálogo',navSupport:'Atención al cliente',allRegions:'Todas las regiones',regionalScope:'Ámbito regional',globalControl:'Control operativo global',regionalAccess:'Acceso regional',protectedSxm:'Acceso Saint-Martin protegido',liveData:'Datos inmediatos en este dispositivo',refreshLive:'Directo / instantáneo',refreshHourly:'Actualización cada hora',refreshDaily:'Actualización cada 24 horas',revenue:'Ingresos cobrados',orders:'Pedidos',professionals:'Profesionales',balance:'Saldo pendiente',latestOrders:'Últimos pedidos por procesar',latestOrdersHelp:'Los pedidos pagados y validados salen automáticamente de esta cola.',noOrders:'Ningún pedido requiere acción.',previous:'Anterior',next:'Siguiente',page:'Página',of:'de',regionsTitle:'Regiones y control territorial',regionsIntro:'Supervise cada región, sus ingresos, ventas, profesionales y pedidos desde un espacio gobernado.',territories:'Territorios',addTerritory:'Añadir territorio',editTerritory:'Editar territorio',deleteTerritory:'Eliminar territorio',region:'Región',territory:'Territorio',country:'País / territorio',city:'Ciudad / hub',code:'Código',save:'Guardar',cancel:'Cancelar',delete:'Eliminar',edit:'Editar',add:'Añadir',active:'Activo',inactive:'Inactivo',adminsTitle:'Administradores y gobierno de accesos',adminsIntro:'Gestione administradores por región protegiendo Saint-Martin y la sede de EE. UU.',addAdmin:'Añadir administrador',role:'Nivel de acceso',globalHq:'Sede EE. UU. — global',caribbeanHq:'Sede Caribe Saint-Martin',regionalAdmin:'Administrador regional',readOnly:'Solo lectura',noPermission:'Su ámbito actual no permite esta acción.',coreOnly:'Solo Jean Jude PAUL, Yonathan FAURE, Olsen NELSON y Guy PAUL pueden tener acceso de sede Caribe Saint-Martin.',professionalsTitle:'Profesionales y socios',professionalsIntro:'Segmente, gestione y localice cada profesional en los territorios autorizados.',addProfessional:'Añadir profesional',company:'Empresa',contact:'Contacto',search:'Buscar',all:'Todos',view:'Vista',list:'Lista',medium:'Tarjetas medianas',large:'Tarjetas grandes',open:'Abrir',deactivate:'Desactivar',activate:'Activar',noProfessionals:'Ningún profesional coincide con los filtros.',invoicesTitle:'Facturas',invoicesIntro:'Las facturas se crean solo tras un pago confirmado y reciben un número secuencial por territorio.',invoiceNo:'Número de factura',orderNo:'Número de pedido',client:'Cliente',date:'Fecha',customDates:'Fechas personalizadas',system:'Sistema',amount:'Importe',environment:'Entorno',interior:'Interior',exterior:'Exterior',paid:'Pagado',downloadPrint:'Abrir / Imprimir PDF',noInvoices:'Ninguna factura pagada coincide con los filtros.',invoice:'Factura',issuedOn:'Emitida el',billTo:'Facturar a',description:'Descripción',quantity:'Cantidad',unitPrice:'Precio unitario',total:'Total',paymentConfirmed:'Pago confirmado',taxNote:'Los impuestos y menciones legales deben configurarse para la entidad emisora antes de producción.',orderQueue:'Cola operativa de pedidos',orderStatus:'Estado del pedido',paymentStatus:'Estado del pago',project:'Proyecto',paidValidatedHidden:'Los pedidos pagados y validados se retiran de esta lista.',receivablesTitle:'Impagos y pagos fraccionados',receivablesIntro:'Priorice saldos pendientes, retrasos y planes de pago activos.',remaining:'Pendiente',overdue:'Atrasado',instalments:'Plazos',portfolioTitle:'Cartera de clientes',portfolioIntro:'Cartera numerada por valor, cobros y saldo pendiente.',rank:'N.º',purchases:'Compras',collected:'Cobrado',loyaltyTitle:'Fidelidad y categorías de clientes',loyaltyIntro:'Clasificación anual en tres niveles: más de 100.000 €, 250.000 € y 500.000 €.',year:'Año',premium:'Premium',prestige:'Prestige',elite:'Elite',standard:'Standard',thresholds:'Umbrales anuales',saveThresholds:'Guardar umbrales',systemsTitle:'Biblioteca de sistemas',systemsIntro:'Añada, edite, numere y reordene sistemas técnicos. Arrastre las fichas para cambiar el orden.',addSystem:'Añadir sistema',layers:'Capas',photo:'Foto',usage:'Uso / descripción',drag:'Arrastrar para reordenar',archive:'Archivar',restore:'Restaurar',draft:'Borrador',published:'Publicado',template:'Plantilla técnica',catalogTitle:'Catálogo y precios',catalogIntro:'Los precios de reventa en EUR y USD son los que aparecen en cada calculadora.',ecsCost:'Precio ECS — sin gastos',resalePrice:'Precio de reventa',exchangeRate:'Tipo manual EUR → USD',marketRate:'Referencia actual de mercado',refreshRate:'Actualizar mercado',applyRate:'Aplicar tipo manual',updated:'Actualizado',family:'Familia',pack:'Formato',priceSaved:'Precios guardados.',omniTitle:'Email, WhatsApp, SMS y teléfono',omniIntro:'Contacte a profesionales directamente o mediante conectores seguros de Brevo, Twilio y HubSpot.',recipient:'Destinatario',message:'Mensaje',subject:'Asunto',compose:'Redactar',sendEmail:'Email',sendWhatsapp:'WhatsApp',sendSms:'SMS',call:'Llamar',connections:'Conexiones',connected:'Configurado',notConnected:'No configurado',saveConnections:'Guardar conexiones',webhookOnly:'Guarde aquí solo URL de webhooks seguros. Nunca pegue claves API en este archivo móvil.',hubspotSync:'Sincronización HubSpot CRM',brevo:'Email Brevo',twilio:'SMS / WhatsApp Twilio',clientHome:'Panel profesional',clientHomeIntro:'Vea las acciones prioritarias y siga su actividad de compra.',urgentPayment:'Pago urgente',urgentPaymentHelp:'Uno o varios pedidos esperan pago. Pague o contacte al servicio al cliente para evitar retrasos.',payNow:'Pagar',monthlyActivity:'Actividad mensual de compras',recentOrders:'Pedidos recientes',loyaltyLevel:'Nivel de fidelidad',calculatorLock:'Flujo de pedido protegido',calculatorLockHelp:'El profesional puede calcular y añadir productos, pero no puede guardar ni exportar un PDF antes del pago. La factura numerada aparece después de confirmar el pago.',supportChannels:'Contactar atención al cliente',supportChannelsHelp:'Elija el canal más rápido para su solicitud.',securityTitle:'Seguridad de producción obligatoria',securityText:'Este archivo autónomo demuestra flujos y permisos en un dispositivo. La unicidad global, sincronización, autenticación, pagos y mensajería externa requieren una base segura y API transaccionales.',filter:'Filtrar',reset:'Restablecer',from:'Desde',to:'Hasta',noResults:'Sin resultados',actions:'Acciones',yes:'Sí',no:'No',status:'Estado',details:'Detalles',number:'N.º'
 }
};
function rc11Settings(){
 store.settings=store.settings||{};
 store.settings.rc11=store.settings.rc11||{};
 const s=store.settings.rc11;
 if(!s.language)s.language='en';
 if(!s.scopeRegion)s.scopeRegion='ALL';
 if(!s.refreshMode)s.refreshMode='hourly';
 if(!Number.isFinite(Number(s.exchangeRate)))s.exchangeRate=1.1;
 s.customTerritories=Array.isArray(s.customTerritories)?s.customTerritories:[];
 s.deletedTerritories=Array.isArray(s.deletedTerritories)?s.deletedTerritories:[];
 s.customSystems=Array.isArray(s.customSystems)?s.customSystems:[];
 s.systemOrder=Array.isArray(s.systemOrder)?s.systemOrder:[];
 s.archivedSystems=Array.isArray(s.archivedSystems)?s.archivedSystems:[];
 s.viewModes=s.viewModes||{professionals:'medium',loyalty:'medium',orders:'medium',invoices:'cards',messages:'comfortable'};
 s.integrations=s.integrations||{brevoWebhook:'',twilioWebhook:'',hubspotWebhook:'',whatsappNumber:'',supportPhone:'',supportEmail:store.settings.supportEmail||''};
 return s;
}
function rc11Lang(){return ['en','fr','es'].includes(rc11Settings().language)?rc11Settings().language:'en'}
function rc11T(key,vars={}){let text=RC11_I18N[rc11Lang()]?.[key]??RC11_I18N.en[key]??key;for(const[k,v]of Object.entries(vars))text=text.replaceAll(`{${k}}`,String(v));return text}
function rc11Locale(){return rc11Lang()==='fr'?'fr-FR':rc11Lang()==='es'?'es-ES':'en-US'}
function rc11Money(v,currency='EUR'){return new Intl.NumberFormat(rc11Locale(),{style:'currency',currency,maximumFractionDigits:2}).format(Number(v||0))}
function rc11Date(v,withTime=false){const d=new Date(v);return Number.isFinite(d.getTime())?d.toLocaleString(rc11Locale(),withTime?{dateStyle:'medium',timeStyle:'short'}:{dateStyle:'medium'}):'—'}
function rc11Region(id){return RC11_REGION_SEED.find(r=>r.id===id)||RC11_REGION_SEED[0]}
function rc11RegionName(id){const r=rc11Region(id);return r.names[rc11Lang()]||r.names.en}
function rc11Territories(regionId=''){
 const s=rc11Settings(),seed=RC11_REGION_SEED.flatMap(r=>r.territories.map(x=>({id:x[0],code:x[1],name:x[2],city:x[3],regionId:r.id,custom:false})));
 return seed.concat(s.customTerritories).filter(t=>!s.deletedTerritories.includes(t.id)&&(!regionId||t.regionId===regionId));
}
function rc11Territory(id){return rc11Territories().find(t=>t.id===id)||null}
function rc11TerritoryLabel(id){const t=rc11Territory(id);return t?`${t.name}${t.city?` — ${t.city}`:''}`:'—'}
function rc11SafeId(prefix='ID'){return prefix+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)}
function rc11NormalizeName(v){return String(v||'').trim().replace(/\s+/g,' ').toLocaleUpperCase('en-US')}
function rc11AdminProfile(){
 const a=currentAccount();if(!a||a.role!=='admin')return null;
 return (store.adminProfiles||[]).find(p=>p.id===a.adminProfileId)||(store.adminProfiles||[]).find(p=>rc11NormalizeName(p.name)===rc11NormalizeName(a.contact))||(store.adminProfiles||[]).find(p=>p.id==='admin-jean-jude')||null;
}
function rc11IsGlobalHq(p=rc11AdminProfile()){return p?.level==='global_hq'&&p?.territoryId==='usa-indiana-hq'}
function rc11IsCaribbeanHq(p=rc11AdminProfile()){return p?.level==='caribbean_hq'&&p?.territoryId==='car-saint-martin'&&RC11_CORE_SXM_NAMES.map(rc11NormalizeName).includes(rc11NormalizeName(p?.name))}
function rc11CanManageGlobal(p=rc11AdminProfile()){return rc11IsGlobalHq(p)||rc11IsCaribbeanHq(p)}
function rc11CanSeeClient(c,p=rc11AdminProfile()){
 if(!p)return false;
 if(c.territoryId==='car-saint-martin')return rc11IsGlobalHq(p)||rc11IsCaribbeanHq(p);
 if(rc11IsGlobalHq(p))return true;
 if(rc11IsCaribbeanHq(p))return c.regionId==='CARIBBEAN';
 return c.regionId===p.regionId;
}
function rc11CanManageClient(c,p=rc11AdminProfile()){
 if(!rc11CanSeeClient(c,p))return false;
 if(rc11CanManageGlobal(p))return true;
 return c.regionId===p.regionId;
}
function rc11CanSeeAdmin(target,p=rc11AdminProfile()){
 if(!p)return false;
 if(target.territoryId==='car-saint-martin')return rc11IsGlobalHq(p)||rc11IsCaribbeanHq(p);
 if(rc11IsGlobalHq(p))return true;
 if(rc11IsCaribbeanHq(p))return target.regionId==='CARIBBEAN';
 return target.regionId===p.regionId&&target.territoryId===p.territoryId;
}
function rc11CanManageAdmin(target,p=rc11AdminProfile()){return rc11IsGlobalHq(p)||(rc11IsCaribbeanHq(p)&&target.regionId==='CARIBBEAN')}
function rc11VisibleClients(){
 const all=(store.accounts||[]).filter(a=>a.role==='client');
 if(!isAdmin())return all.filter(a=>a.id===effectiveClientId());
 const scope=rc11Settings().scopeRegion;
 return all.filter(rc11CanSeeClient).filter(c=>scope==='ALL'||c.regionId===scope);
}
function rc11AnalyticsClients(){
 const all=(store.accounts||[]).filter(a=>a.role==='client'),p=rc11AdminProfile(),scope=rc11Settings().scopeRegion;
 const allowed=rc11CanManageGlobal(p)?all:all.filter(c=>c.regionId===p?.regionId);
 return allowed.filter(c=>scope==='ALL'||c.regionId===scope);
}
function rc11OrdersFor(clients=rc11VisibleClients()){
 const out=[];for(const c of clients)for(const[index,o]of(store.tenants[c.id]?.orders||[]).entries())out.push({client:c,tenantId:c.id,index,order:o});return out;
}
function rc11RegionOptions(selected='',allowAll=false){return`${allowAll?`<option value="ALL">${esc(rc11T('allRegions'))}</option>`:''}${RC11_REGION_SEED.map(r=>`<option value="${r.id}" ${selected===r.id?'selected':''}>${r.flag} ${esc(rc11RegionName(r.id))}</option>`).join('')}`}
function rc11TerritoryOptions(regionId,selected=''){return rc11Territories(regionId).map(t=>`<option value="${esc(t.id)}" ${selected===t.id?'selected':''}>${esc(t.name)}${t.city?` — ${esc(t.city)}`:''}</option>`).join('')}
function rc11RoleLabel(level){return level==='global_hq'?rc11T('globalHq'):level==='caribbean_hq'?rc11T('caribbeanHq'):level==='read_only'?rc11T('readOnly'):rc11T('regionalAdmin')}
function rc11Initials(name){return String(name||'RC').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function rc11IsPaid(o){return rcOrderBalance(o)<=0&&Number(o.totalEUR||0)>0||['Payé','Paid'].includes(o.paymentStatus)}
function rc11IsValidated(o){return ['Validée / récupérée','Terminée','Confirmée','Prête à être récupérée','Expédiée / livrée'].includes(o.status)}
function rc11Sequence(type,client,dateValue){
 store.rc11Sequences=store.rc11Sequences||{orders:{},invoices:{}};
 store.rc11Sequences[type]=store.rc11Sequences[type]||{};
 const d=new Date(dateValue||Date.now()),year=Number.isFinite(d.getTime())?d.getUTCFullYear():new Date().getUTCFullYear(),territory=rc11Territory(client.territoryId),region=rc11Region(client.regionId),key=`${client.territoryId||'unknown'}-${year}`;
 const prefix=type==='invoices'?'INV':'ORD',territoryCode=territory?.code||'REG',regionCode=region?.code||'GLB';
 const existing=new Set(rc11OrdersFor((store.accounts||[]).filter(a=>a.role==='client')).flatMap(x=>type==='invoices'?[x.order.invoice?.number].filter(Boolean):[x.order.orderNumber].filter(Boolean)));
 let n=Math.max(0,Number(store.rc11Sequences[type][key])||0),candidate='';
 do{n++;candidate=`${prefix}-${regionCode}-${territoryCode}-${year}-${String(n).padStart(6,'0')}`}while(existing.has(candidate));
 store.rc11Sequences[type][key]=n;return candidate;
}
function rc11EnsureOrderNumber(order,client){
 if(!order.orderNumber)order.orderNumber=rc11Sequence('orders',client,order.createdAt);
 order.regionId=order.regionId||client.regionId;order.territoryId=order.territoryId||client.territoryId;order.country=order.country||rc11Territory(order.territoryId)?.name||'';order.environment=order.environment||'Interior';return order.orderNumber;
}
function rc11EnsureInvoice(order,client){
 if(!rc11IsPaid(order))return null;
 if(order.invoice&&typeof order.invoice==='object'&&order.invoice.number)return order.invoice;
 const paidAt=order.paidAt||order.updatedAt||new Date().toISOString();order.paidAt=paidAt;
 const number=rc11Sequence('invoices',client,paidAt),items=JSON.parse(JSON.stringify(order.items||[]));
 order.invoice={number,invoiceNumber:number,issuedAt:paidAt,paidAt,orderId:order.id,orderNumber:order.orderNumber||rc11EnsureOrderNumber(order,client),clientId:client.id,clientName:rcClientName(client),company:client.company||'',email:client.email||'',address:client.address||'',regionId:client.regionId,territoryId:client.territoryId,country:rc11Territory(client.territoryId)?.name||client.country||'',systemName:order.systemName||rcSystemKey(order),environment:order.environment||'Interior',project:order.project||'',currency:'EUR',subtotalEUR:Number(order.totalEUR||0),totalEUR:Number(order.totalEUR||0),totalUSD:Number(order.totalUSD||0),items,status:'Paid',immutable:true};
 auditV9('Automatic numbered invoice','invoice:'+number,null,{orderId:order.id,clientId:client.id,territoryId:client.territoryId});return order.invoice;
}
function rc11AllInvoices(clients=rc11VisibleClients()){
 const out=[];for(const x of rc11OrdersFor(clients)){const inv=x.order.invoice;if(inv&&typeof inv==='object'&&inv.number)out.push({...x,invoice:inv})}return out.sort((a,b)=>new Date(b.invoice.issuedAt)-new Date(a.invoice.issuedAt));
}
function rc11Thresholds(){
 store.settings.loyaltyThresholds=store.settings.loyaltyThresholds||{};const t=store.settings.loyaltyThresholds;
 if(!Number.isFinite(Number(t.premium))||Number(t.premium)<100000)t.premium=100000;if(!Number.isFinite(Number(t.prestige))||Number(t.prestige)<250000)t.prestige=250000;if(!Number.isFinite(Number(t.elite))||Number(t.elite)<500000)t.elite=500000;return t;
}
rcThresholds=rc11Thresholds;
rcTierFor=function(total){const t=rc11Thresholds(),v=Number(total||0);return v>Number(t.elite)?'Elite':v>Number(t.prestige)?'Prestige':v>Number(t.premium)?'Premium':'Standard'};
rcNextTier=function(total){const t=rc11Thresholds(),v=Number(total||0);if(v<=t.premium)return{label:'Premium',remaining:t.premium-v,target:t.premium};if(v<=t.prestige)return{label:'Prestige',remaining:t.prestige-v,target:t.prestige};if(v<=t.elite)return{label:'Elite',remaining:t.elite-v,target:t.elite};return{label:'Elite',remaining:0,target:t.elite}};
function rc11ApplyCustomSystems(){
 const s=rc11Settings();for(const custom of s.customSystems){if(!SYSTEMS.some(x=>x.id===custom.id))SYSTEMS.push(JSON.parse(JSON.stringify(custom)))}
 const order=[...s.systemOrder,...SYSTEMS.map(x=>x.id).filter(id=>!s.systemOrder.includes(id))],byId=new Map(SYSTEMS.map(x=>[x.id,x]));SYSTEMS.splice(0,SYSTEMS.length,...order.map(id=>byId.get(id)).filter(Boolean));s.systemOrder=SYSTEMS.map(x=>x.id);for(const sys of SYSTEMS)sys.rc11Archived=s.archivedSystems.includes(sys.id);
}
function rc11CatalogPrice(row,tier='recommended'){
 const s=rc11Settings(),base=rc11BasePriceOf(row,tier),saved=store.catalogOverrides?.[row.id]?.rc11Prices?.[tier]||{};
 const rate=Math.max(.0001,Number(s.exchangeRate)||1.1),costUSD=Number(saved.costUSD??base.baseUSD??0),resaleUSD=Number(saved.resaleUSD??base.resaleUSD??0),costEUR=Number(saved.costEUR??costUSD/rate),resaleEUR=Number(saved.resaleEUR??base.eur??resaleUSD/rate);
 return{...base,baseUSD:costUSD,resaleUSD,eur:resaleEUR,costUSD,costEUR,resaleEUR};
}
const rc11BasePriceOf=priceOf;priceOf=function(row,tier){return rc11CatalogPrice(row,tier)};
function rc11Migrate(){
 const s=rc11Settings();rc11Thresholds();store.adminProfiles=Array.isArray(store.adminProfiles)?store.adminProfiles:[];
 for(const seed of RC11_ADMIN_SEED){const match=store.adminProfiles.find(p=>p.id===seed.id)||store.adminProfiles.find(p=>rc11NormalizeName(p.name)===rc11NormalizeName(seed.name));if(!match)store.adminProfiles.push({...seed});else Object.assign(match,{regionId:match.regionId||seed.regionId,territoryId:match.territoryId||seed.territoryId,level:match.level||seed.level,protected:seed.protected||match.protected})}
 if(!(store.accounts||[]).some(a=>a.email==='usa.hq@elitecrete.local'))store.accounts.push({id:'admin-usa-demo',role:'admin',company:'Elite Crete Systems',contact:'USA HQ — Indiana',email:'usa.hq@elitecrete.local',passwordHash:'25e4113023518d5ba9a58b0aac62eefc22be3187773a5e18c877083273c26d6a',active:true,adminProfileId:'admin-usa-hq',regionId:'USA',territoryId:'usa-indiana-hq',createdAt:new Date().toISOString(),demoOnly:true});
 const adminAccount=(store.accounts||[]).find(a=>a.role==='admin');if(adminAccount){const named=store.adminProfiles.find(p=>rc11NormalizeName(p.name)===rc11NormalizeName(adminAccount.contact));if(named)adminAccount.adminProfileId=named.id;else if(!adminAccount.adminProfileId){adminAccount.adminProfileId='admin-jean-jude';if(!adminAccount.contact||adminAccount.contact==='Administrateur')adminAccount.contact='Jean Jude PAUL'}adminAccount.regionId=adminAccount.regionId||'CARIBBEAN';adminAccount.territoryId=adminAccount.territoryId||'car-saint-martin'}
 for(const c of(store.accounts||[]).filter(a=>a.role==='client')){c.regionId=c.regionId||'CARIBBEAN';c.territoryId=c.territoryId||'car-saint-martin';c.country=c.country||rc11Territory(c.territoryId)?.name||'Saint-Martin';c.city=c.city||rc11Territory(c.territoryId)?.city||'';c.environment=c.environment||'Interior';const t=store.tenants[c.id]||(store.tenants[c.id]={cart:[],simulations:[],orders:[],documents:[],messages:[],notifications:[]});t.orders=Array.isArray(t.orders)?t.orders:[]}
 rc11ApplyCustomSystems();
 const rows=rc11OrdersFor((store.accounts||[]).filter(a=>a.role==='client')).sort((a,b)=>new Date(a.order.createdAt)-new Date(b.order.createdAt));for(const x of rows)rc11EnsureOrderNumber(x.order,x.client);for(const x of rows.filter(x=>rc11IsPaid(x.order)).sort((a,b)=>new Date(a.order.paidAt||a.order.createdAt)-new Date(b.order.paidAt||b.order.createdAt)))rc11EnsureInvoice(x.order,x.client);
 document.documentElement.lang=rc11Lang();document.title=`RENOVO CRETE — ${RC11_VERSION}`;saveStore();
}
const rc11BaseCreateOrder=createOrderFromCartV96;
createOrderFromCartV96=function(mode='later'){
 const order=rc11BaseCreateOrder(mode),client=currentClient();if(!order||!client)return order;order.regionId=client.regionId;order.territoryId=client.territoryId;order.country=rc11Territory(client.territoryId)?.name||client.country||'';order.environment=form.environment||client.environment||'Interior';rc11EnsureOrderNumber(order,client);saveStore();return order;
};
const rc11BaseUpdateOrderPayment=updateOrderPaymentV96;
updateOrderPaymentV96=function(tenantId,index,value){rc11BaseUpdateOrderPayment(tenantId,index,value);const c=store.accounts.find(a=>a.id===tenantId),o=store.tenants[tenantId]?.orders?.[index];if(c&&o&&rc11IsPaid(o)){o.paidAt=o.paidAt||new Date().toISOString();rc11EnsureInvoice(o,c);saveStore()}};
const rc11BaseShowOrderDetail=rcShowOrderDetail;
rcShowOrderDetail=function(tid,index){
 rc11BaseShowOrderDetail(tid,index);const c=store.accounts.find(a=>a.id===tid),o=store.tenants[tid]?.orders?.[index],btn=$('rcSavePayment'),heading=$('modalCard')?.querySelector('h3');if(heading&&o)heading.textContent=rc11OrderDisplay(o);if(!c||!o||!btn)return;const base=btn.onclick;btn.onclick=()=>{base?.();if(rc11IsPaid(o)){o.paidAt=o.paidAt||new Date().toISOString();rc11EnsureInvoice(o,c)}saveStore();renderShell()};
};
rc11Migrate();
