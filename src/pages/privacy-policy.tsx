const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 font-bold text-3xl text-gray-800 md:text-4xl">Politique de confidentialité</h1>
      <p className="mb-8 text-gray-600 text-sm italic">Dernière mise à jour : ****</p>

      {/* Section 1: Introduction */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">1. Introduction</h2>
        <p className="mb-4 text-gray-600">
          La présente politique de confidentialité a pour objectif d’informer de manière claire, transparente et précise
          sur la manière dont la société Scintia, société par actions simplifiée au capital de 3 000 euros, immatriculée
          au RCS de Lyon sous le numéro 930 581 749 et domiciliée au 3 rue de Genève, 69006 Lyon, traite les données
          personnelles dans le cadre de l’exploitation de son site internet et de sa plateforme SaaS.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia accorde une importance particulière à la protection de la vie privée, à la sécurité des données et au
          respect du Règlement Général sur la Protection des Données (RGPD – Règlement UE 2016/679) ainsi qu’à la
          législation française applicable en matière de protection des données.
        </p>
        <p className="mb-4 text-gray-600">Cette politique précise :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Les données collectées et traitées par Scintia ;</li>
          <li>Les finalités et bases légales de ces traitements ;</li>
          <li>Les droits dont disposent les personnes concernées ;</li>
          <li>Les engagements pris par Scintia pour garantir la confidentialité et la sécurité des données.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Cette politique s’applique à l’ensemble des traitements de données réalisés dans le cadre :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>De la navigation sur le site scintia.ai ;</li>
          <li>
            De l’utilisation des services proposés via la plateforme SaaS Scintia par les clients professionnels ;
          </li>
          <li>
            De l’accès aux interfaces de la plateforme par des utilisateurs finaux créés par les clients (agents,
            managers, superviseurs…).
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Pour toute question relative à cette politique ou à l’exercice de vos droits, vous pouvez contacter notre
          référent RGPD à l’adresse suivante :&nbsp;
          <a href="mailto:privacy@scintia.ai" className="text-blue-600 hover:underline">
            privacy@scintia.ai
          </a>
          .
        </p>
      </section>

      {/* Section 2: Qui est concerné par cette politique ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">2. Qui est concerné par cette politique ?</h2>
        <p className="mb-4 text-gray-600">
          La présente politique de confidentialité s’applique à toutes les personnes dont les données personnelles sont
          collectées ou traitées par Scintia, dans les contextes suivants :
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Visiteurs du site internet scintia.ai</h3>
        <p className="mb-4 text-gray-600">
          Il s’agit des personnes consultant le site web, qu’il s’agisse de simples visiteurs ou d’utilisateurs
          interagissant via un formulaire (contact, démo, newsletter).
        </p>
        <p className="mb-4 text-gray-600">Les données concernées incluent notamment :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Les informations saisies dans les formulaires (nom, prénom, email, message)</li>
          <li>Les données techniques de navigation (adresse IP, cookies, type de navigateur, pages visitées…)</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          b) Clients de la plateforme Scintia (utilisateurs SaaS)
        </h3>
        <p className="mb-4 text-gray-600">
          Il s’agit des entreprises ou professionnels ayant souscrit à un abonnement ou créé un compte utilisateur sur
          la plateforme SaaS. Ces clients peuvent accéder à différents modules (Developer Panel, Business Panel, Closing
          Panel, Manager Panel).
        </p>
        <p className="mb-4 text-gray-600">Les données traitées peuvent inclure :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Les informations d’identification du client (nom, entreprise, email, téléphone, informations de facturation)
          </li>
          <li>
            Les données d’usage de la plateforme (paramétrages, historique d’appels, configuration d’agents IA,
            transcriptions, enregistrements si activés)
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">c) Utilisateurs créés par les clients</h3>
        <p className="mb-4 text-gray-600">
          Les clients de Scintia ont la possibilité de créer des comptes pour leurs propres collaborateurs (agents
          humains, superviseurs, managers…). Ces utilisateurs accèdent à certaines interfaces sécurisées de la
          plateforme.
        </p>
        <p className="mb-4 text-gray-600">Les données concernées incluent généralement :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Le nom, prénom, adresse email professionnelle, numéro de téléphone professionnel</li>
          <li>Le rôle ou niveau d’accès au sein de l’organisation cliente</li>
          <li>
            Les données d’activité liées à leur usage de la plateforme (appels, actions, fichiers, tickets internes)
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Dans ce contexte, Scintia agit en tant que sous-traitant des données pour le compte de ses clients
          professionnels, conformément à l’article 28 du RGPD.
        </p>
      </section>

      {/* Section 3: Quelles données sont collectées ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">3. Quelles données sont collectées ?</h2>
        <p className="mb-4 text-gray-600">
          Scintia collecte uniquement les données nécessaires au bon fonctionnement de son site internet, de sa
          plateforme SaaS et à la fourniture de ses services. Ces données varient selon votre statut (visiteur, client,
          utilisateur final) et selon votre niveau d’interaction avec les outils proposés.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          a) Données collectées sur le site internet scintia.ai
        </h3>
        <p className="mb-4 text-gray-600">
          Lors de votre navigation sur le site web ou lorsque vous remplissez un formulaire, Scintia peut collecter les
          informations suivantes :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Informations d’identification : nom, prénom, adresse e-mail, société, numéro de téléphone, secteur
            d’activité
          </li>
          <li>Données transmises via les formulaires de contact ou de demande de démo</li>
          <li>
            Données techniques de navigation : adresse IP, type d’appareil, type de navigateur, pages visitées, durée de
            navigation
          </li>
          <li>
            Données issues des cookies : préférences utilisateur, mesure d’audience (Google Analytics, Pixel Meta)
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          b) Données collectées lors de l’utilisation de la plateforme SaaS (clients professionnels)
        </h3>
        <p className="mb-4 text-gray-600">
          Lorsque vous créez un compte sur la plateforme ou utilisez l’un des modules, les données suivantes peuvent
          être collectées :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Informations de compte : nom, prénom, entreprise, fonction, adresse e-mail professionnelle, numéro de
            téléphone
          </li>
          <li>
            Données liées à la configuration des services : création d’agents IA, prompts, horaires d’activation,
            numéros attribués
          </li>
          <li>Données liées aux appels : numéro de l’appelant, date et heure, durée, statut (répondu/non répondu)</li>
          <li>Contenu des appels : enregistrements audio (si activés), transcriptions, résumés, mots-clés extraits</li>
          <li>Données de facturation : mode de paiement, informations de transaction via Stripe, échéancier</li>
          <li>Données techniques : logs de connexion, historique d’usage, erreurs rencontrées</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          c) Données concernant les utilisateurs créés par les clients
        </h3>
        <p className="mb-4 text-gray-600">
          Les clients peuvent créer des comptes pour leurs collaborateurs internes (agents, managers, superviseurs) sur
          la plateforme. Pour ces utilisateurs, Scintia collecte :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Données d’identification : nom, prénom, adresse email professionnelle, numéro de téléphone</li>
          <li>Rôle et niveau d’accès à la plateforme</li>
          <li>
            Données d’usage : actions effectuées sur la plateforme, appels traités, tickets ouverts ou clôturés,
            performance (le cas échéant)
          </li>
          <li>Données vocales ou transcrites si l’utilisateur est associé à un agent AI</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Scintia ne traite ces données qu’au nom et pour le compte de ses clients professionnels, dans le cadre strict
          des fonctionnalités offertes par la plateforme.
        </p>
      </section>

      {/* Section 4: Pourquoi ces données sont-elles collectées ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">4. Pourquoi ces données sont-elles collectées ?</h2>
        <p className="mb-4 text-gray-600">
          Scintia collecte et traite des données personnelles uniquement dans le cadre de finalités déterminées,
          explicites et légitimes. Ces finalités varient en fonction du type d’utilisateur et de l’usage du site ou de
          la plateforme.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Pour les visiteurs du site internet scintia.ai</h3>
        <p className="mb-4 text-gray-600">
          Les données collectées via les formulaires ou les cookies sont utilisées aux fins suivantes :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Répondre aux demandes de contact ou de démo</li>
          <li>Gérer les demandes d’information précontractuelles</li>
          <li>Mesurer l’audience du site et améliorer son ergonomie</li>
          <li>Personnaliser le contenu affiché et améliorer l’expérience utilisateur</li>
          <li>Assurer la sécurité du site et prévenir les abus ou tentatives de fraude</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          b) Pour les clients utilisateurs de la plateforme SaaS
        </h3>
        <p className="mb-4 text-gray-600">
          Les données collectées lors de l’inscription ou de l’utilisation de la plateforme sont nécessaires pour :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Créer et gérer les comptes clients</li>
          <li>Configurer les services souscrits (agents IA, numéros, scénarios d’appels)</li>
          <li>Assurer la mise en service et le bon fonctionnement des fonctionnalités proposées</li>
          <li>Suivre les performances des agents vocaux ou humains</li>
          <li>Générer les appels, transcrire les échanges, analyser les sentiments ou mots-clés</li>
          <li>Suivre les tickets de support et la relation client</li>
          <li>Gérer la facturation, les abonnements, les paiements et les dépassements éventuels</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">c) Pour les utilisateurs créés par les clients</h3>
        <p className="mb-4 text-gray-600">
          Les données des utilisateurs internes créés par les entreprises clientes sont traitées pour :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Leur permettre d’accéder à leur espace du business panel</li>
          <li>Gérer leur rôle, leurs actions et leur traçabilité sur la plateforme</li>
          <li>Faciliter la supervision par les managers internes de l’entreprise cliente</li>
          <li>Suivre les statistiques d’usage, la performance et l’activité opérationnelle</li>
          <li>Enregistrer ou transcrire leurs appels si la fonctionnalité est activée par le client</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Dans ce cadre, Scintia agit comme sous-traitant, conformément à l’article 28 du RGPD. Le client reste seul
          responsable de la licéité de la collecte des données des utilisateurs qu’il crée.
        </p>
      </section>

      {/* Section 5: Quelle est la base légale de ces traitements ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">5. Quelle est la base légale de ces traitements ?</h2>
        <p className="mb-4 text-gray-600">
          Conformément au Règlement Général sur la Protection des Données (RGPD), chaque traitement de données
          personnelles réalisé par Scintia repose sur une base légale clairement identifiée.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Consentement (article 6.1.a du RGPD)</h3>
        <p className="mb-4 text-gray-600">
          Certaines données sont collectées uniquement si vous y consentez expressément, notamment :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>L’envoi d’un formulaire de contact ou de démo</li>
          <li>L’inscription à des communications commerciales (si proposées)</li>
          <li>Le dépôt de cookies non essentiels (cookies de mesure d’audience, publicité ciblée)</li>
          <li>L’activation de l’enregistrement des appels (option activée par le client final)</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Vous pouvez retirer votre consentement à tout moment en nous contactant ou en modifiant vos préférences (pour
          les cookies).
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">b) Exécution du contrat (article 6.1.b du RGPD)</h3>
        <p className="mb-4 text-gray-600">
          Lorsque vous êtes client de la plateforme Scintia, la majorité des traitements sont nécessaires à l’exécution
          du contrat conclu entre vous et Scintia. Cela concerne notamment :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>La création et la gestion de votre compte</li>
          <li>La configuration des agents IA et des services associés</li>
          <li>Le traitement des appels, des transcriptions et des enregistrements</li>
          <li>L’accès aux panels, le suivi des tickets, la gestion des numéros</li>
          <li>La facturation, le paiement des abonnements, le calcul des dépassements</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">c) Intérêt légitime (article 6.1.f du RGPD)</h3>
        <p className="mb-4 text-gray-600">
          Scintia peut également traiter certaines données sur la base de son intérêt légitime, notamment pour :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Assurer la sécurité de ses systèmes et des données</li>
          <li>Prévenir les fraudes ou usages abusifs</li>
          <li>Améliorer les performances et la fiabilité de la plateforme</li>
          <li>Réaliser des analyses statistiques anonymisées à des fins d’amélioration continue</li>
          <li>Suivre les performances des agents (IA ou humains) à des fins d’optimisation</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Dans ce cadre, Scintia veille à toujours respecter un juste équilibre entre ses intérêts et les droits et
          libertés des personnes concernées.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">d) Obligation légale (article 6.1.c du RGPD)</h3>
        <p className="mb-4 text-gray-600">
          Enfin, certaines données peuvent être conservées ou traitées en raison d’obligations légales, notamment :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Pour répondre à des demandes d’autorités judiciaires ou administratives</li>
          <li>Pour respecter les obligations comptables et fiscales</li>
          <li>Pour gérer les droits des personnes concernées (preuve de consentement, suppression, opposition…)</li>
        </ul>
      </section>

      {/* Section 6: Avec qui partageons-nous les données ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">6. Avec qui partageons-nous les données ?</h2>
        <p className="mb-4 text-gray-600">
          Les données personnelles traitées par Scintia sont utilisées exclusivement dans le cadre des services
          proposés. Elles peuvent être partagées avec des destinataires internes ou des sous-traitants techniques dans
          les seuls cas nécessaires à la bonne exécution du contrat, à la sécurité de la plateforme ou au respect d’une
          obligation légale.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia ne commercialise jamais vos données personnelles, ne les revend ni ne les transfère à des tiers à des
          fins publicitaires ou non justifiées.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Destinataires internes</h3>
        <p className="mb-4 text-gray-600">
          Les données sont accessibles, dans la limite de leurs missions respectives, aux équipes suivantes :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Équipe technique : pour l’hébergement, le support et le maintien des services.</li>
          <li>Équipe support client : pour le traitement des demandes d’assistance et la gestion des tickets.</li>
          <li>
            Équipe commerciale interne de Scintia : pour la gestion de la relation client et le suivi des abonnements
            (via le Closing Panel, réservé aux commerciaux internes uniquement).
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">b) Sous-traitants techniques</h3>
        <p className="mb-4 text-gray-600">
          Scintia fait appel à des prestataires tiers spécialisés pour assurer certaines fonctionnalités essentielles.
          Ces sous-traitants agissent uniquement sur instruction de Scintia, sont encadrés par des contrats de
          sous-traitance conformes au RGPD (DPA), et s’engagent à ne pas traiter les données à d’autres fins.
        </p>
        <p className="mb-4 text-gray-600">Voici les principaux sous-traitants utilisés :</p>
        <div className="overflow-x-auto">
          <table className="mb-4 w-full table-auto border-collapse text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Prestataire</th>
                <th className="border px-4 py-2">Finalité du traitement</th>
                <th className="border px-4 py-2">Localisation des données</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Twilio</td>
                <td className="border px-4 py-2">
                  Fourniture des services d’appel téléphonique (entrants et sortants)
                </td>
                <td className="border px-4 py-2">Union Européenne ou États-Unis (sous clauses contractuelles types)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">OpenAI</td>
                <td className="border px-4 py-2">
                  Traitement en temps réel des appels (transcription, analyse de sentiment, détection de mots-clés)
                </td>
                <td className="border px-4 py-2">Traitement instantané, sans stockage – États-Unis</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Stripe</td>
                <td className="border px-4 py-2">Paiement en ligne, gestion des abonnements, échéanciers, relances</td>
                <td className="border px-4 py-2">Union Européenne ou États-Unis (avec DPA et conformité RGPD)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">n8n</td>
                <td className="border px-4 py-2">
                  Automatisations des workflows entre services (internes et externes)
                </td>
                <td className="border px-4 py-2">
                  Hébergé et sécurisé par Scintia dans un environnement conforme RGPD
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">NeonDB</td>
                <td className="border px-4 py-2">Base de données PostgreSQL principale</td>
                <td className="border px-4 py-2">Datacenters localisés dans l’Union Européenne</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Microsoft Azure</td>
                <td className="border px-4 py-2">Sauvegarde et infrastructure cloud complémentaire</td>
                <td className="border px-4 py-2">Région européenne</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Google (Analytics / reCAPTCHA)</td>
                <td className="border px-4 py-2">Mesure d’audience, protection anti-bot (site web uniquement)</td>
                <td className="border px-4 py-2">Données pseudonymisées – consentement requis via bandeau cookies</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 text-gray-600">
          Une liste exhaustive et actualisée des sous-traitants peut être fournie sur demande à :&nbsp;
          <a href="mailto:privacy@scintia.ai" className="text-blue-600 hover:underline">
            privacy@scintia.ai
          </a>
          .
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">c) Transmission à des tiers</h3>
        <p className="mb-4 text-gray-600">
          Les données personnelles ne sont jamais transmises à des tiers sauf dans les cas suivants :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Obligation légale ou réglementaire, telle qu’une demande émanant d’une autorité judiciaire ou administrative
            habilitée ;
          </li>
          <li>
            En cas d’intérêt légitime avéré pour la prévention de fraudes ou la gestion d’un incident de sécurité majeur
            ;
          </li>
          <li>À la demande expresse de la personne concernée ou avec son consentement clair.</li>
        </ul>
      </section>

      {/* Section 7: Combien de temps les données sont-elles conservées ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">
          7. Combien de temps les données sont-elles conservées ?
        </h2>
        <p className="mb-4 text-gray-600">
          Scintia ne conserve les données personnelles que pendant la durée strictement nécessaire à la réalisation des
          finalités pour lesquelles elles ont été collectées, et en conformité avec les obligations légales et
          réglementaires applicables.
        </p>
        <p className="mb-4 text-gray-600">
          La durée de conservation varie selon la nature des données et le profil de l’utilisateur concerné.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Données des visiteurs du site internet</h3>
        <div className="overflow-x-auto">
          <table className="mb-4 w-full table-auto border-collapse text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Type de données</th>
                <th className="border px-4 py-2">Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Données saisies via formulaire de contact ou de démo</td>
                <td className="border px-4 py-2">12 mois à compter du dernier contact entrant</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données de navigation (cookies)</td>
                <td className="border px-4 py-2">13 mois maximum (voir politique cookies)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">b) Données des clients (utilisateurs SaaS)</h3>
        <div className="overflow-x-auto">
          <table className="mb-4 w-full table-auto border-collapse text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Type de données</th>
                <th className="border px-4 py-2">Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Données de compte (identité, entreprise, email, rôle)</td>
                <td className="border px-4 py-2">
                  Tant que le compte est actif + 3 ans après suppression (à des fins probatoires)
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données de facturation et de paiement (Stripe)</td>
                <td className="border px-4 py-2">10 ans (obligation comptable)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données de configuration (agents IA, horaires, prompts, scénarios)</td>
                <td className="border px-4 py-2">
                  Tant que le client utilise la plateforme ou jusqu’à suppression manuelle
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données d’appel : métadonnées (durée, numéro, statut)</td>
                <td className="border px-4 py-2">24 mois</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données d’appel : enregistrements audio (si activés)</td>
                <td className="border px-4 py-2">
                  Jusqu’à suppression manuelle par le client (pas de suppression automatique sauf indication)
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données transcrites ou analysées par IA</td>
                <td className="border px-4 py-2">Identique à la durée de conservation des appels correspondants</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          c) Données des utilisateurs créés par les clients (agents, superviseurs…)
        </h3>
        <div className="overflow-x-auto">
          <table className="mb-4 w-full table-auto border-collapse text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Type de données</th>
                <th className="border px-4 py-2">Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Données d’identification (nom, email, téléphone, rôle)</td>
                <td className="border px-4 py-2">Tant que le compte rattaché au client est actif</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données d’activité (logs, actions, appels traités)</td>
                <td className="border px-4 py-2">24 mois</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Données vocales ou transcrites</td>
                <td className="border px-4 py-2">
                  Identique aux appels enregistrés ou transcrits, selon les paramètres activés par le client
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">d) Données techniques (logs, erreurs, diagnostics)</h3>
        <div className="overflow-x-auto">
          <table className="mb-4 w-full table-auto border-collapse text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Type de données</th>
                <th className="border px-4 py-2">Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Logs de sécurité et de connexion</td>
                <td className="border px-4 py-2">6 mois</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Logs applicatifs et journaux techniques</td>
                <td className="border px-4 py-2">3 mois (pouvant être étendu en cas d’incident)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 text-gray-600">
          Scintia applique un système de purge régulière automatisée ou manuelle des données à l’issue de ces délais,
          sauf si leur conservation est nécessaire à des fins de preuve, de conformité ou de résolution d’un litige.
        </p>
      </section>

      {/* Section 8: Quels sont vos droits ? */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">8. Quels sont vos droits ?</h2>
        <p className="mb-4 text-gray-600">
          Conformément au Règlement Général sur la Protection des Données (RGPD), toute personne concernée par un
          traitement de données personnelles dispose des droits suivants, qu’elle peut exercer à tout moment auprès de
          Scintia.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Droit d’accès</h3>
        <p className="mb-4 text-gray-600">Vous avez le droit d’obtenir :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>La confirmation que vos données sont bien traitées par Scintia ;</li>
          <li>L’accès aux données vous concernant ;</li>
          <li>Une copie des données conservées.</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">b) Droit de rectification</h3>
        <p className="mb-4 text-gray-600">
          Si vous constatez que vos données sont inexactes, incomplètes ou obsolètes, vous pouvez demander à ce qu’elles
          soient corrigées ou complétées.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">c) Droit à l’effacement (droit à l’oubli)</h3>
        <p className="mb-4 text-gray-600">
          Vous pouvez demander la suppression de vos données personnelles dans les cas prévus par le RGPD, notamment si
          :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Les données ne sont plus nécessaires aux finalités pour lesquelles elles ont été collectées ;</li>
          <li>Vous retirez votre consentement ;</li>
          <li>Vous vous opposez au traitement et qu’il n’existe pas de motif légitime impérieux pour le poursuivre.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Certaines données peuvent être conservées pour respecter des obligations légales (ex : conservation
          comptable).
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">d) Droit à la limitation du traitement</h3>
        <p className="mb-4 text-gray-600">
          Vous pouvez demander la suspension temporaire du traitement de vos données si vous contestez leur exactitude,
          si le traitement est illicite, ou si vous vous y opposez en attendant la vérification de motifs légitimes.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">e) Droit d’opposition</h3>
        <p className="mb-4 text-gray-600">
          Vous pouvez vous opposer à tout moment, pour des raisons tenant à votre situation particulière, à un
          traitement fondé sur l’intérêt légitime de Scintia.
        </p>
        <p className="mb-4 text-gray-600">
          Dans le cas d’un traitement à des fins de prospection (ex. : emailings, relances commerciales), ce droit est
          absolu.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">f) Droit à la portabilité</h3>
        <p className="mb-4 text-gray-600">
          Vous pouvez demander à recevoir les données personnelles que vous avez fournies à Scintia, dans un format
          structuré, couramment utilisé et lisible par machine, afin de les transmettre à un autre prestataire.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">g) Droit de retirer votre consentement</h3>
        <p className="mb-4 text-gray-600">
          Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment, sans que cela ne
          remette en cause la licéité du traitement effectué avant le retrait.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">
          h) Droit d’introduire une réclamation auprès de la CNIL
        </h3>
        <p className="mb-4 text-gray-600">
          Si vous estimez que vos droits ne sont pas respectés ou qu’un traitement ne respecte pas la réglementation,
          vous pouvez adresser une réclamation à l’autorité de contrôle compétente :
        </p>
        <p className="mb-4 text-gray-600">
          CNIL – Commission Nationale de l’Informatique et des Libertés
          <br />
          <a href="http://www.cnil.fr" className="text-blue-600 hover:underline">
            www.cnil.fr
          </a>
          <br />
          Service des plaintes
          <br />3 Place de Fontenoy – TSA 80715 – 75334 Paris Cedex 07
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">i) Exercice de vos droits</h3>
        <p className="mb-4 text-gray-600">
          Pour exercer vos droits, vous pouvez nous adresser une demande par email à :&nbsp;
          <a href="mailto:privacy@scintia.ai" className="text-blue-600 hover:underline">
            privacy@scintia.ai
          </a>
        </p>
        <p className="mb-4 text-gray-600">
          Un justificatif d’identité pourra vous être demandé en cas de doute raisonnable sur votre identité.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia s’engage à répondre à votre demande dans un délai d’un mois à compter de sa réception, ce délai
          pouvant être prolongé de deux mois en cas de complexité ou de nombre important de demandes.
        </p>
      </section>

      {/* Section 9: Cookies et traceurs */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">9. Cookies et traceurs</h2>
        <p className="mb-4 text-gray-600">
          Lors de votre navigation sur le site scintia.ai, des cookies ou technologies similaires peuvent être utilisés
          pour assurer le bon fonctionnement du site, améliorer l’expérience utilisateur et mesurer l’audience.
        </p>
        <p className="mb-4 text-gray-600">
          Conformément à la réglementation en vigueur, les cookies non essentiels (notamment de mesure d’audience ou de
          personnalisation) ne sont déposés qu’avec votre consentement, recueilli via un bandeau d’information dès votre
          première visite.
        </p>
        <p className="mb-4 text-gray-600">
          Vous pouvez à tout moment gérer vos préférences en matière de cookies ou retirer votre consentement en
          accédant à notre module de gestion des cookies.
        </p>
        <p className="mb-4 text-gray-600">
          Pour plus d’informations sur les types de cookies utilisés, leur durée de conservation et les modalités de
          configuration, vous pouvez consulter notre Politique de cookies.
        </p>
      </section>

      {/* Section 10: Sécurité, mise à jour et contact */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">10. Sécurité, mise à jour et contact</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">a) Sécurité des données</h3>
        <p className="mb-4 text-gray-600">
          Scintia met en œuvre des mesures techniques, organisationnelles et logicielles rigoureuses pour garantir la
          confidentialité, l’intégrité et la disponibilité des données personnelles traitées.
        </p>
        <p className="mb-4 text-gray-600">Ces mesures incluent notamment :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Le chiffrement des données sensibles au repos et en transit ;</li>
          <li>L’authentification forte (2FA) sur l’ensemble des accès internes ;</li>
          <li>Le cloisonnement des environnements et des rôles utilisateurs ;</li>
          <li>Des sauvegardes quotidiennes sécurisées, avec rétention glissante ;</li>
          <li>
            La tenue d’un registre des incidents et un plan de gestion des violations de données, activé en cas de
            faille avérée.
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          L’accès aux données est strictement réservé aux personnes autorisées, formées et tenues par une obligation de
          confidentialité.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia effectue également des audits réguliers de ses systèmes pour anticiper et corriger toute
          vulnérabilité.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">b) Mise à jour de la politique</h3>
        <p className="mb-4 text-gray-600">
          La présente politique peut être modifiée à tout moment, notamment pour tenir compte :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>D’évolutions législatives ou réglementaires ;</li>
          <li>De changements dans les services proposés ;</li>
          <li>D’ajouts ou suppressions de sous-traitants techniques ;</li>
          <li>De retours de la CNIL ou d’audits internes.</li>
        </ul>
        <p className="mb-4 text-gray-600">La date de dernière mise à jour est indiquée en haut du document.</p>
        <p className="mb-4 text-gray-600">
          En cas de modification substantielle affectant vos droits ou les finalités de traitement, vous en serez
          informé par email ou directement via la plateforme Scintia.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">c) Contact</h3>
        <p className="mb-4 text-gray-600">
          Pour toute question relative à la présente politique ou pour exercer vos droits, vous pouvez nous contacter :
        </p>
        <p className="mb-4 text-gray-600">
          Par email :&nbsp;
          <a href="mailto:privacy@scintia.ai" className="text-blue-600 hover:underline">
            privacy@scintia.ai
          </a>
          <br />
          Par courrier : SCINTIA SAS, 3 rue de Genève, 69006 Lyon, France
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
