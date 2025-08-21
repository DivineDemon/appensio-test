const TermsAndConditions = () => {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 font-bold text-3xl text-gray-800 md:text-4xl">Conditions générales de vente (CGV)</h1>
      <p className="mb-8 text-gray-600 text-sm italic">08/07/2025</p>

      {/* Section 1: Objet */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">1. Objet</h2>
        <p className="mb-4 text-gray-600">
          Les présentes Conditions Générales de Vente (ci-après « CGV ») ont pour objet de définir les modalités et
          conditions dans lesquelles la société Scintia, société par actions simplifiée au capital de 3 000 euros,
          immatriculée au RCS de Lyon sous le numéro 930 581 749, dont le siège social est situé au 3 rue de Genève,
          69006 Lyon (ci-après « Scintia »), fournit à ses clients professionnels (ci-après le « Client ») un accès à sa
          plateforme SaaS d’automatisation des appels téléphoniques via des agents vocaux intelligents.
        </p>
        <p className="mb-4 text-gray-600">Scintia propose un ensemble de services permettant notamment :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            La création, configuration et gestion d’agents vocaux IA destinés à gérer des appels entrants ou sortants de
            manière autonome ;
          </li>
          <li>
            L’accès à une interface de suivi et de pilotage appelée Business Panel, permettant au Client de consulter
            les performances des agents IA, de suivre les minutes utilisées, de gérer les fichiers injectés, et
            d’administrer les paramètres techniques liés à son compte.
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Les services sont accessibles via abonnement mensuel, avec ou sans dépassement du quota de minutes inclus, et
          sont activés à la suite du paiement de frais de mise en service, payables en une fois ou en plusieurs fois.
        </p>
        <p className="mb-4 text-gray-600">
          Les présentes CGV s’appliquent à toute souscription effectuée par un Client professionnel, à l’exclusion des
          consommateurs et non-professionnels au sens du Code de la consommation.
        </p>
      </section>

      {/* Section 2: Définitions */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">2. Définitions</h2>
        <p className="mb-4 text-gray-600">
          Aux fins des présentes Conditions Générales de Vente, les termes ci-dessous, qu’ils soient utilisés au
          singulier ou au pluriel, auront la signification suivante :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            <span className="font-medium">Client :</span> toute personne morale agissant dans le cadre de son activité
            professionnelle, ayant souscrit un abonnement aux services de Scintia et bénéficiant d’un accès à la
            plateforme.
          </li>
          <li>
            <span className="font-medium">Utilisateur :</span> toute personne physique habilitée par le Client à accéder
            à la plateforme Scintia, en particulier au Business Panel. L’Utilisateur peut être un agent, un manager, un
            superviseur ou tout collaborateur du Client.
          </li>
          <li>
            <span className="font-medium">Plateforme :</span> l’environnement SaaS développé par Scintia, accessible en
            ligne, regroupant l’ensemble des services proposés, dont les interfaces de gestion, de suivi, de
            configuration et d’exploitation des agents vocaux IA.
          </li>
          <li>
            <span className="font-medium">Business Panel :</span> interface de gestion principale mise à disposition du
            Client, permettant de superviser l’activité des agents IA, d’accéder aux données d’usage, à la facturation,
            aux performances, et de gérer les paramètres du compte.
          </li>
          <li>
            <span className="font-medium">Agent IA :</span> agent vocal intelligent configuré par le Client via la
            plateforme, capable de prendre en charge des appels téléphoniques de manière autonome, selon les scénarios
            définis par le Client (prise de rendez-vous, standard téléphonique, qualification, etc.).
          </li>
          <li>
            <span className="font-medium">Abonnement :</span> souscription mensuelle donnant accès aux services de
            Scintia, incluant un quota de minutes d’appel, l’accès à la plateforme, et la maintenance courante.
          </li>
          <li>
            <span className="font-medium">Frais de mise en service :</span>
            &nbsp; montant forfaitaire initial dû par le Client à la création de son compte, couvrant les frais de
            configuration, d’installation technique, et d’activation des services. Ces frais peuvent être réglés en une
            fois ou en plusieurs échéances.
          </li>
          <li>
            <span className="font-medium">Hors forfait :</span> volume de minutes téléphoniques utilisé par le Client
            au-delà du quota mensuel inclus dans son abonnement. Ces minutes sont facturées séparément, au tarif de 0,15
            € HT par minute.
          </li>
          <li>
            <span className="font-medium">Compte :</span> espace personnel sécurisé, attribué au Client lors de la
            souscription, lui permettant d’accéder à la plateforme et de créer des Utilisateurs.
          </li>
          <li>
            <span className="font-medium">Panel :</span> interface spécifique accessible depuis la plateforme,
            correspondant à un périmètre fonctionnel déterminé (ex. : Business Panel, Developer Panel, Panel Commercial,
            etc.).
          </li>
          <li>
            <span className="font-medium">Données :</span> toutes informations, fichiers, scripts, documents, prompts,
            ou contenus transmis par le Client via la plateforme, notamment à des fins de paramétrage des agents IA ou
            d’analyse.
          </li>
        </ul>
      </section>

      {/* Section 3: Acceptation et opposabilité */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">3. Acceptation et opposabilité</h2>
        <p className="mb-4 text-gray-600">
          Les présentes Conditions Générales de Vente (CGV) s’appliquent à toute commande de services passée auprès de
          Scintia par un Client professionnel.
        </p>
        <p className="mb-4 text-gray-600">
          Elles sont expressément acceptées par le Client lors de la signature du contrat ou du bon de commande, auquel
          elles sont annexées. Cette signature matérialise l’adhésion pleine et entière du Client aux présentes CGV,
          sans réserve ni condition.
        </p>
        <p className="mb-4 text-gray-600">
          Les CGV forment, avec le contrat ou le bon de commande signé, un ensemble contractuel indivisible, régissant
          la relation entre Scintia et le Client.
        </p>
        <p className="mb-4 text-gray-600">
          Elles sont opposables au Client dès la date de signature et s’appliquent pendant toute la durée d’exécution du
          contrat ou de l’abonnement.
        </p>
        <p className="mb-4 text-gray-600">
          Le fait que Scintia ne se prévale pas, à un moment donné, de l’une quelconque des clauses des présentes CGV ne
          pourra être interprété comme valant renonciation à s’en prévaloir ultérieurement.
        </p>
        <p className="mb-4 text-gray-600">
          En cas de mise à jour des CGV par Scintia, une nouvelle version pourra être communiquée au Client à titre
          d’information. Toutefois, seule la version annexée au contrat ou au bon de commande signé reste applicable,
          sauf modification acceptée d’un commun accord entre les parties.
        </p>
      </section>

      {/* Section 4: Création de compte – Accès à la plateforme */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">4. Création de compte – Accès à la plateforme</h2>
        <p className="mb-4 text-gray-600">
          L’accès à la plateforme Scintia est ouvert exclusivement aux Clients professionnels ayant signé un contrat ou
          un bon de commande valide et réglé les frais de mise en service, selon les modalités convenues.
        </p>
        <p className="mb-4 text-gray-600">
          La création du compte principal est réalisée par Scintia, au moment de l’activation du premier ou des agents
          vocaux commandés par le Client. Cette activation donne automatiquement accès au Business Panel, interface de
          gestion permettant de configurer les paramètres d’usage, de suivre les performances, de consulter les
          statistiques, la consommation de minutes, les éléments de facturation et l’état des agents IA.
        </p>
        <p className="mb-4 text-gray-600">
          Le Client recevra par email les identifiants de connexion sécurisés à son compte principal, qui pourront
          ensuite être utilisés pour :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Gérer les informations de l’entreprise ;</li>
          <li>Créer ou administrer des Utilisateurs internes (managers, agents, superviseurs…) ;</li>
          <li>Accéder aux modules associés à son abonnement.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le Client est seul responsable du maintien de la confidentialité des identifiants et de l’usage qui est fait
          des accès attribués à ses collaborateurs. En cas d’accès frauduleux ou de compromission, il s’engage à en
          informer Scintia sans délai.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia se réserve le droit de désactiver temporairement ou définitivement un compte utilisateur ou un accès
          au panel, en cas de non-respect des présentes CGV ou de comportement compromettant la sécurité ou la stabilité
          de la plateforme.
        </p>
      </section>

      {/* Section 5: Description des services */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">5. Description des services</h2>
        <p className="mb-4 text-gray-600">
          Scintia met à disposition de ses Clients professionnels une plateforme SaaS dédiée à l’automatisation des
          appels téléphoniques à l’aide d’agents vocaux intelligents.
        </p>
      </section>

      {/* Section 6: Formule souscrite */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">6. Formule souscrite</h2>
        <p className="mb-4 text-gray-600">
          Le Client bénéficie des services correspondant à la formule choisie au moment de la signature du contrat ou du
          bon de commande, telle que précisée dans les conditions particulières.
        </p>
        <p className="mb-4 text-gray-600">
          À la date des présentes CGV, Scintia propose plusieurs formules d’abonnement mensuel, incluant chacune :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>L’accès à un ou plusieurs agents vocaux IA configurés selon les besoins métier du Client ;</li>
          <li>L’accès à une interface sécurisée appelée Business Panel, permettant de :</li>
          <ul className="mb-4 ml-6 list-inside list-disc text-gray-600">
            <li>Suivre les performances des agents IA en temps réel ;</li>
            <li>Visualiser les appels traités et la consommation de minutes ;</li>
            <li>Gérer les utilisateurs, les droits d’accès et les paramètres liés au compte ;</li>
            <li>Accéder aux factures, à l’historique de paiement et à l’état du contrat ;</li>
          </ul>
          <li>Un quota mensuel de minutes d’appel, variable selon la formule souscrite ;</li>
          <li>L’accès aux fonctionnalités standards de configuration, de supervision et de reporting ;</li>
          <li>Un support client standard, accessible par email les jours ouvrés.</li>
        </ul>
      </section>

      {/* Section 7: Services complémentaires */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">7. Services complémentaires</h2>
        <p className="mb-4 text-gray-600">
          En fonction de ses besoins et de son évolution, le Client peut bénéficier de services optionnels ou
          complémentaires, tels que :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>L’ajout d’agents IA supplémentaires ;</li>
          <li>L’intégration avec des outils tiers (ex. CRM, calendrier, base de données) ;</li>
          <li>Des prestations d’accompagnement technique ou fonctionnel, sur devis ;</li>
          <li>
            La facturation des minutes consommées au-delà du quota mensuel, selon le tarif en vigueur (voir Article 10).
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Certaines fonctionnalités avancées, telles que la transcription d’appel, l’analyse de sentiments, la synthèse
          de conversation ou la détection de mots-clés, pourront être proposées à l’avenir. Leur disponibilité et leurs
          conditions d’accès feront l’objet d’une communication spécifique de la part de Scintia, et, le cas échéant,
          d’une tarification distincte.
        </p>
      </section>

      {/* Section 8: Licence d’utilisation */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">8. Licence d’utilisation</h2>
        <p className="mb-4 text-gray-600">
          Scintia concède au Client, pendant toute la durée de son abonnement et sous réserve du parfait respect des
          présentes CGV, un droit d’utilisation personnel, non exclusif, non transférable et non cessible de sa
          plateforme SaaS, dans les limites définies au contrat ou au bon de commande signé.
        </p>
        <p className="mb-4 text-gray-600">Cette licence est strictement limitée à :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>L’accès à la plateforme Scintia via une interface web sécurisée (Business Panel) ;</li>
          <li>L’usage des agents vocaux IA créés et configurés pour le Client ;</li>
          <li>La gestion des appels automatisés dans le cadre de l’activité professionnelle du Client.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          La présente licence n’emporte aucun droit de propriété intellectuelle sur les logiciels, développements,
          technologies ou éléments constituant la plateforme Scintia.
        </p>
        <p className="mb-4 text-gray-600">Le Client s’interdit expressément :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            De procéder à toute forme de revente, sous-licence, mise à disposition ou location des services ou de la
            plateforme à des tiers non autorisés ;
          </li>
          <li>
            De copier, modifier, adapter, décompiler, désassembler ou tenter d’extraire le code source de tout ou partie
            de la plateforme ;
          </li>
          <li>D’utiliser la plateforme à des fins frauduleuses, détournées ou contraires aux lois en vigueur.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Toute utilisation non conforme à la présente licence pourra entraîner la suspension immédiate des services,
          sans préjudice de toute action en responsabilité que Scintia se réserve le droit d’engager.
        </p>
      </section>

      {/* Section 9: Commande – Droit d’entrée */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">9. Commande – Droit d’entrée</h2>
        <p className="mb-4 text-gray-600">
          L’accès aux services de Scintia est conditionné à la signature préalable d’un contrat ou d’un bon de commande
          par le Client, accompagné du paiement des frais de mise en service définis dans les conditions particulières.
        </p>
        <p className="mb-4 text-gray-600">Ces frais couvrent notamment :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>La configuration initiale du compte Client et des agents IA ;</li>
          <li>L’attribution des accès au Business Panel ;</li>
          <li>L’intégration éventuelle de fichiers ou d’outils externes fournis par le Client ;</li>
          <li>La mise en place des paramètres nécessaires à l’activation du service.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le montant des frais de mise en service est forfaitaire et dû une seule fois par souscription, sauf cas
          particulier expressément convenu entre les parties.
        </p>
        <p className="mb-4 text-gray-600">
          Le paiement s’effectue via Stripe, par carte bancaire ou, le cas échéant, par prélèvement SEPA.
        </p>
        <p className="mb-4 text-gray-600">Le Client peut, au moment de la commande, choisir de régler ces frais :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>En une seule fois ;</li>
          <li>Ou en plusieurs échéances (jusqu’à 20 fois), selon les modalités proposées par Scintia via Stripe.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le règlement des frais de mise en service constitue une condition préalable à toute activation des services.
          En cas de non-paiement intégral ou partiel à l’échéance prévue, Scintia se réserve le droit de suspendre la
          mise en production ou l’accès à la plateforme.
        </p>
      </section>

      {/* Section 10: Abonnement mensuel – Durée – Reconduction */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">10. Abonnement mensuel – Durée – Reconduction</h2>
        <p className="mb-4 text-gray-600">
          Les services de Scintia sont proposés sous forme d’un abonnement mensuel sans engagement, dont la durée
          initiale est d’un (1) mois à compter de la date d’activation du service.
        </p>
        <p className="mb-4 text-gray-600">
          L’abonnement est tacitement reconductible par périodes successives d’un mois, sauf résiliation effectuée dans
          les conditions prévues à l’article 9.
        </p>
        <p className="mb-4 text-gray-600">
          Le Client peut à tout moment, via son espace personnel ou sur demande auprès de Scintia :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Modifier sa formule d’abonnement, en optant pour une offre supérieure ou inférieure (upgrade/downgrade) ;
          </li>
          <li>Ajouter ou retirer des options ou fonctionnalités complémentaires ;</li>
          <li>Demander l’ajout ou la suppression d’agents IA.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Toute modification prend effet immédiatement ou à la prochaine échéance mensuelle, selon les conditions
          précisées au moment de la demande. Les éventuels ajustements tarifaires sont alors appliqués à la facturation
          suivante.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia se réserve le droit de modifier, à tout moment, ses formules d’abonnement ou sa politique tarifaire.
          Ces modifications ne s’appliqueront pas aux contrats en cours, sauf reconduction tacite ou modification
          acceptée par le Client.
        </p>
      </section>

      {/* Section 11: Résiliation – Préavis */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">11. Résiliation – Préavis</h2>
        <p className="mb-4 text-gray-600">
          Le Client peut résilier son abonnement à tout moment, sans justification, en respectant un préavis d’un (1)
          mois complet.
        </p>
        <p className="mb-4 text-gray-600">La résiliation doit être notifiée à Scintia :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Soit via l’espace client sécurisé (Business Panel) ;</li>
          <li>Soit par email à l’adresse de contact indiquée dans les conditions particulières.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le préavis prend effet au 1er jour du mois suivant la demande de résiliation. La facturation du mois suivant
          est intégralement due, et l’accès aux services reste actif jusqu’à la fin de ce mois.
        </p>
        <p className="mb-4 text-gray-600">
          Exemple : une résiliation transmise le 10 avril entraîne une facturation complète du mois de mai, avec coupure
          des services au 31 mai à 23h59.
        </p>
        <p className="mb-4 text-gray-600">
          La résiliation n’emporte pas remboursement des sommes déjà versées, y compris en cas de non-utilisation des
          services pendant le préavis.
        </p>
        <p className="mb-4 text-gray-600">
          En cas de manquement grave ou répété du Client à ses obligations contractuelles (ex. : défaut de paiement,
          usage illicite, comportement abusif), Scintia se réserve le droit de résilier le contrat de plein droit et
          sans préavis, après mise en demeure restée sans effet pendant sept (7) jours calendaires.
        </p>
        <p className="mb-4 text-gray-600">La résiliation, quelle qu’en soit la cause, entraîne :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>La suppression des accès du Client et de ses utilisateurs ;</li>
          <li>La désactivation des agents IA ;</li>
          <li>
            L’archivage ou la suppression progressive des données, conformément à la politique de conservation de
            Scintia.
          </li>
        </ul>
      </section>

      {/* Section 12: Prix – Facturation – Paiement */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">12. Prix – Facturation – Paiement</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">13. Prix</h3>
        <p className="mb-4 text-gray-600">
          Le prix des services proposés par Scintia est indiqué en euros hors taxes (HT), selon les tarifs en vigueur au
          moment de la signature du contrat ou du bon de commande.
        </p>
        <p className="mb-4 text-gray-600">Les frais dus par le Client peuvent comprendre :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Des frais de mise en service (voir Article 7) ;</li>
          <li>Un abonnement mensuel, correspondant à la formule souscrite ;</li>
          <li>
            Le cas échéant, des minutes d’appel consommées au-delà du quota mensuel inclus dans l’abonnement (« hors
            forfait »), facturées au tarif de 0,15 € HT par minute.
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">14. Facturation</h3>
        <p className="mb-4 text-gray-600">La facturation est gérée via Stripe, plateforme de paiement sécurisée.</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Les frais de mise en service sont facturés dès la signature du contrat, payables en une ou plusieurs fois
            selon les modalités proposées.
          </li>
          <li>L’abonnement mensuel est facturé à date fixe chaque mois.</li>
          <li>
            Les minutes hors forfait sont comptabilisées automatiquement et facturées en fin de période mensuelle.
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Les factures sont adressées au Client par voie électronique, à l’adresse email fournie lors de la
          souscription. Elles sont réputées remises à la date d’envoi.
        </p>
        <p className="mb-4 text-gray-600">
          Le Client peut à tout moment demander à recevoir à nouveau tout ou partie de ses factures par simple demande
          écrite.
        </p>
        <p className="mb-4 text-gray-600">
          Une mise à disposition automatique des factures dans l’espace Business Panel est prévue, mais ne sera active
          qu’à une date ultérieure. Le Client en sera informé dès que cette fonctionnalité sera disponible.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">15. Modalités de paiement</h3>
        <p className="mb-4 text-gray-600">Le Client règle les sommes dues par :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Carte bancaire (paiement unique ou échelonné via Stripe) ;</li>
          <li>Ou prélèvement SEPA, lorsque cette option est activée.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Les prélèvements mensuels sont automatiques. Le Client s’engage à maintenir un moyen de paiement valide
          pendant toute la durée du contrat.
        </p>
        <p className="mb-4 text-gray-600">
          En cas d’échec de paiement (CB expirée, rejet SEPA, etc.), les dispositions de l’article 11 s’appliquent.
        </p>
      </section>

      {/* Section 16: Impayés – Suspension – Recouvrement */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">16. Impayés – Suspension – Recouvrement</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">17. Incident de paiement</h3>
        <p className="mb-4 text-gray-600">
          Tout incident de paiement, qu’il concerne une échéance des frais de mise en service, l’abonnement mensuel ou
          les minutes hors forfait, entraîne l’envoi automatique de notifications par Stripe au Client, avec nouvelles
          tentatives de prélèvement dans les jours suivants.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">18. Suspension des services</h3>
        <p className="mb-4 text-gray-600">
          En l’absence de régularisation dans un délai de dix (10) jours calendaires après la première tentative de
          prélèvement échouée :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Scintia pourra suspendre automatiquement l’accès aux services : coupure des appels, désactivation des agents
            IA, blocage du Business Panel.
          </li>
          <li>Cette suspension est réversible dès régularisation complète du solde dû.</li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">19. Pénalités de retard</h3>
        <p className="mb-4 text-gray-600">
          Tout montant non payé à l’échéance portera, de plein droit et sans mise en demeure préalable :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>des intérêts de retard au taux légal en vigueur,</li>
          <li>
            assortis d’une indemnité forfaitaire de 40 euros pour frais de recouvrement, conformément aux articles
            L441-10 et D441-5 du Code de commerce.
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">20. Recouvrement</h3>
        <p className="mb-4 text-gray-600">
          Si l’impayé persiste au-delà de 30 jours, malgré les relances automatiques et/ou manuelles :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Scintia se réserve le droit de résilier le contrat de plein droit, sans préavis supplémentaire ;</li>
          <li>
            Le dossier pourra être transmis à une société de recouvrement spécialisée ou à un cabinet juridique mandaté
            ;
          </li>
          <li>
            Tous les frais liés au recouvrement pourront être répercutés au Client, sur présentation de justificatifs.
          </li>
        </ul>
      </section>

      {/* Section 21: Obligations du client */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">21. Obligations du client</h2>
        <p className="mb-4 text-gray-600">
          Le Client s’engage, pendant toute la durée du contrat, à respecter les obligations suivantes, essentielles à
          la bonne exécution des services :
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">22. Fourniture d’informations complètes et exactes</h3>
        <p className="mb-4 text-gray-600">
          Le Client s’engage à fournir à Scintia l’ensemble des informations nécessaires à la configuration efficace de
          ses agents vocaux IA, y compris :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Les contenus utiles (fichiers, consignes, données contextuelles) ;</li>
          <li>Les scénarios de traitement d’appel souhaités ;</li>
          <li>Les éventuelles contraintes spécifiques liées à son secteur d’activité.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le Client est seul responsable des conséquences d’une mauvaise configuration résultant d’informations
          incomplètes, erronées ou transmises hors délai.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">23. Utilisation conforme des services</h3>
        <p className="mb-4 text-gray-600">Le Client s’engage à :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Utiliser les services exclusivement dans le cadre de son activité professionnelle licite ;</li>
          <li>
            Ne pas détourner l’usage des agents IA à des fins illicites, trompeuses, contraires à l’ordre public ou aux
            bonnes mœurs ;
          </li>
          <li>
            Ne pas utiliser la plateforme pour transmettre, héberger ou traiter des contenus sensibles, confidentiels ou
            protégés sans autorisation préalable.
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le Client reconnaît qu’il est seul responsable du contenu des appels traités par ses agents IA, ainsi que des
          données injectées ou collectées via la plateforme.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">24. Accès, sécurité et confidentialité</h3>
        <p className="mb-4 text-gray-600">
          Le Client est responsable de la confidentialité des identifiants et de l’accès à son espace personnel, ainsi
          qu’à ceux de ses Utilisateurs.
        </p>
        <p className="mb-4 text-gray-600">
          Il s’engage à notifier immédiatement à Scintia tout usage non autorisé ou tentative d’intrusion.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">25. Respect des limites d’usage</h3>
        <p className="mb-4 text-gray-600">
          Le Client s’engage à ne pas dépasser les volumes ou conditions définis dans sa formule d’abonnement sans en
          informer Scintia, et à s’acquitter des éventuels frais liés au hors forfait ou à l’ajout d’options.
        </p>
        <p className="mb-4 text-gray-600">
          En cas de comportement anormal ou de surcharge volontaire ou involontaire du système, Scintia se réserve le
          droit de suspendre temporairement l’accès aux services jusqu’à clarification.
        </p>
      </section>

      {/* Section 26: Obligations de Scintia */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">26. Obligations de Scintia</h2>
        <p className="mb-4 text-gray-600">
          Scintia s’engage, pendant toute la durée du contrat, à fournir les services souscrits dans le respect des
          règles de l’art, de la réglementation applicable et des engagements définis aux présentes CGV.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">27. Mise à disposition des services</h3>
        <p className="mb-4 text-gray-600">Scintia s’engage à :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Mettre en place les accès à la plateforme et au Business Panel dans un délai raisonnable après la signature
            du contrat et le paiement des frais de mise en service ;
          </li>
          <li>Configurer les agents vocaux IA selon les éléments fournis par le Client ;</li>
          <li>
            Permettre au Client et à ses utilisateurs autorisés d’accéder à la plateforme, sous réserve de la validité
            de l’abonnement.
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">28. Disponibilité et maintenance</h3>
        <p className="mb-4 text-gray-600">
          Scintia met en œuvre tous les moyens raisonnables pour assurer une disponibilité continue des services, hors
          périodes de maintenance planifiée ou d’interruption liée à un événement de force majeure.
        </p>
        <p className="mb-4 text-gray-600">
          Des opérations de maintenance correctives, évolutives ou préventives peuvent être réalisées. Le cas échéant,
          une information sera transmise au Client avec un préavis raisonnable, sauf urgence technique.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">29. Support et assistance</h3>
        <p className="mb-4 text-gray-600">
          Scintia assure un support standard accessible par email, aux jours ouvrés (du lundi au vendredi, de 9h à 17h,
          hors jours fériés), pour répondre aux demandes d’assistance technique ou fonctionnelle.
        </p>
        <p className="mb-4 text-gray-600">
          Le traitement des demandes se fait dans un délai raisonnable, sans engagement contractuel de délai de réponse
          sauf accord spécifique. Des prestations d’accompagnement ou d’assistance renforcée peuvent être proposées sur
          devis.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">30. Sécurité et protection des données</h3>
        <p className="mb-4 text-gray-600">
          Scintia s’engage à mettre en œuvre les mesures techniques et organisationnelles appropriées pour assurer la
          sécurité, la confidentialité et l’intégrité des données du Client, conformément à sa charte de sécurité et à
          la législation en vigueur.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia agit en qualité de responsable ou de sous-traitant des traitements selon les cas d’usage, tel que
          détaillé dans la politique de confidentialité.
        </p>
      </section>

      {/* Section 31: Données personnelles – RGPD */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">31. Données personnelles – RGPD</h2>
        <p className="mb-4 text-gray-600">
          Scintia s’engage à respecter la réglementation applicable en matière de protection des données personnelles,
          notamment le Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et la loi Informatique et Libertés.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">32. Responsabilités de traitement</h3>
        <p className="mb-4 text-gray-600">Scintia intervient :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            En tant que responsable de traitement pour les données liées à la gestion de la relation commerciale et
            contractuelle avec le Client (données de facturation, contacts, suivi d’activité, etc.) ;
          </li>
          <li>
            En tant que sous-traitant, pour les données traitées via la plateforme dans le cadre de l’utilisation des
            agents IA par le Client (ex. : contenus d’appel, métadonnées, transcriptions, si activées).
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le Client reconnaît qu’il reste pleinement responsable des données personnelles qu’il fournit à Scintia ou
          fait traiter via les agents IA, et s’engage à respecter les droits des personnes concernées, notamment en
          matière d’information et de consentement si nécessaire.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">33. Données concernées</h3>
        <p className="mb-4 text-gray-600">Les données susceptibles d’être traitées incluent :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Les données d’identification des utilisateurs internes du Client (nom, prénom, email, rôle, activité) ;
          </li>
          <li>
            Les informations vocales ou textuelles échangées lors des appels traités par les agents IA, lorsque ces
            fonctionnalités sont activées (transcription, analyse, etc.) ;
          </li>
          <li>
            Les données techniques d’usage de la plateforme (logs, heures d’appel, durée, statut, volumes consommés).
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">34. Finalités</h3>
        <p className="mb-4 text-gray-600">Les traitements de données réalisés par Scintia ont pour finalité :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>La fourniture et l’exécution des services souscrits ;</li>
          <li>Le paramétrage et la supervision des agents vocaux IA ;</li>
          <li>La facturation, la gestion du compte client et le support technique ;</li>
          <li>
            L’amélioration continue des services, notamment à travers des analyses internes pseudonymisées ou agrégées.
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">35. Sous-traitants et hébergement</h3>
        <p className="mb-4 text-gray-600">
          Scintia fait appel à des prestataires techniques conformes au RGPD, dans le cadre de la mise en œuvre de ses
          services. Ces sous-traitants sont notamment les suivants :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Twilio : infrastructure de téléphonie (routage, numérotation, traitement des appels) ;</li>
          <li>
            VAPI : orchestration du traitement vocal en temps réel et pont technique entre l’IA et les moteurs de
            synthèse vocale ;
          </li>
          <li>Fournisseurs de voix synthétiques connectés via VAPI, incluant notamment :</li>
          <ul className="mb-4 ml-6 list-inside list-disc text-gray-600">
            <li>OpenAI,</li>
            <li>Microsoft Azure (Speech Services),</li>
            <li>ElevenLabs,</li>
            <li>
              ou tout autre moteur compatible que Scintia pourra sélectionner en fonction des évolutions technologiques
              ou des besoins de performance ;
            </li>
          </ul>
          <li>Stripe : gestion des paiements et des abonnements ;</li>
          <li>
            Azure / NeonDB : hébergement sécurisé des données de production (appels, logs, scripts, configuration) ;
          </li>
          <li>n8n : gestion des automatisations internes entre systèmes (facturation, CRM, notification, etc.).</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Scintia se réserve le droit de modifier ou compléter cette liste, tout en garantissant un niveau équivalent de
          sécurité, de confidentialité et de conformité à la réglementation. Une liste actualisée peut être fournie sur
          demande écrite du Client.
        </p>
        <p className="mb-4 text-gray-600">
          Tous les sous-traitants sont soumis à des contrats conformes à l’article 28 du RGPD (Data Processing
          Agreements – DPA) encadrant leur accès aux données.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">36. Droits des personnes concernées</h3>
        <p className="mb-4 text-gray-600">
          Toute personne dont les données sont traitées dans le cadre des services de Scintia peut exercer ses droits
          d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité, en contactant :
        </p>
        <p className="mb-4 text-gray-600">
          <a href="mailto:privacy@scintia.ai" className="text-blue-600 hover:underline">
            privacy@scintia.ai
          </a>
        </p>
        <p className="mb-4 text-gray-600">
          Scintia répondra à toute demande dans un délai maximum d’un (1) mois, sauf circonstances exceptionnelles.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">37. Politique de confidentialité</h3>
        <p className="mb-4 text-gray-600">
          Le détail des traitements, durées de conservation, bases légales et mesures de sécurité est disponible dans la
          politique de confidentialité complète, accessible à tout moment sur le site internet de Scintia.
        </p>
      </section>

      {/* Section 38: Sécurité – Confidentialité */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">38. Sécurité – Confidentialité</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">39. Sécurité des accès et des données</h3>
        <p className="mb-4 text-gray-600">
          Scintia met en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité,
          l’intégrité et la confidentialité des données traitées sur sa plateforme, conformément à l’état de l’art et
          aux exigences du RGPD.
        </p>
        <p className="mb-4 text-gray-600">Ces mesures incluent notamment :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Le chiffrement des données sensibles au repos et en transit ;</li>
          <li>La segmentation des environnements techniques ;</li>
          <li>L’authentification forte (MFA) pour les comptes internes de gestion ;</li>
          <li>Des sauvegardes automatisées, avec rétention glissante et restauration possible ;</li>
          <li>Le suivi et la journalisation des actions critiques sur la plateforme.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le Client reconnaît que, malgré les précautions prises, aucun système n’offre une sécurité absolue, et qu’il
          lui appartient d’adopter une posture responsable dans l’usage de la plateforme.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">40. Responsabilité partagée</h3>
        <p className="mb-4 text-gray-600">Le Client est responsable :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>De la confidentialité de ses identifiants de connexion et de ceux de ses utilisateurs ;</li>
          <li>Du contrôle des accès internes à son compte ;</li>
          <li>De toute action réalisée depuis ses identifiants, y compris en cas d’usurpation non signalée.</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Scintia ne pourra être tenue responsable des conséquences d’un usage frauduleux ou non autorisé des accès du
          Client, sauf preuve d’une défaillance imputable exclusivement à Scintia.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">41. Confidentialité des informations</h3>
        <p className="mb-4 text-gray-600">
          Chacune des parties s’engage à respecter la plus stricte confidentialité concernant toutes les informations
          désignées comme telles ou raisonnablement considérées comme sensibles ou stratégiques, et ce pendant toute la
          durée du contrat et pendant cinq (5) ans après sa cessation, sauf disposition légale contraire.
        </p>
        <p className="mb-4 text-gray-600">Ne sont pas considérées comme confidentielles les informations :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>Tombées dans le domaine public sans faute d’une des parties ;</li>
          <li>Connues d’une partie avant leur communication par l’autre ;</li>
          <li>Réclamées par une autorité judiciaire ou administrative compétente.</li>
        </ul>
      </section>

      {/* Section 42: Propriété intellectuelle */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">42. Propriété intellectuelle</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">43. Titularité des droits</h3>
        <p className="mb-4 text-gray-600">
          Scintia est et demeure seule titulaire de l’ensemble des droits de propriété intellectuelle relatifs à :
        </p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            Sa plateforme logicielle (y compris les panels, interfaces, algorithmes, workflows, connecteurs et outils
            internes) ;
          </li>
          <li>Ses agents vocaux IA, leur fonctionnement, leurs mécanismes de dialogue, de routage et d’analyse ;</li>
          <li>
            Ses bases de données, documentations, scripts, éléments visuels, modèles, textes, chartes graphiques et
            systèmes d’automatisation.
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Aucune disposition des présentes CGV ne saurait être interprétée comme conférant au Client un quelconque droit
          de propriété sur ces éléments.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">44. Licence d’utilisation</h3>
        <p className="mb-4 text-gray-600">
          Le Client dispose d’un droit d’usage strictement limité, personnel, non exclusif, non transférable et non
          cessible, dans les conditions prévues à l’article 6.
        </p>
        <p className="mb-4 text-gray-600">
          Ce droit d’utilisation est accordé uniquement dans le cadre professionnel pour les besoins de l’activité du
          Client, pendant la durée de validité de son abonnement.
        </p>
        <p className="mb-4 text-gray-600">
          Toute tentative de reproduction, modification, extraction, décompilation, diffusion ou revente de tout ou
          partie de la plateforme ou de ses composants est strictement interdite et pourra donner lieu à des poursuites
          judiciaires.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">45. Contenus fournis par le Client</h3>
        <p className="mb-4 text-gray-600">
          Le Client demeure titulaire des droits sur les données, fichiers, scripts, prompts ou contenus qu’il injecte
          sur la plateforme. Il garantit être pleinement autorisé à les utiliser et à les confier à Scintia à des fins
          de traitement.
        </p>
        <p className="mb-4 text-gray-600">
          Le Client accorde à Scintia un droit d’utilisation strictement technique et temporaire de ces éléments, dans
          le seul but d’exécuter les services souscrits.
        </p>
        <p className="mb-4 text-gray-600">
          Scintia s’engage à ne pas exploiter commercialement ni communiquer à des tiers les contenus transmis, sauf
          accord exprès du Client ou obligation légale.
        </p>
      </section>

      {/* Section 46: Responsabilité – Limitations */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">46. Responsabilité – Limitations</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">47. Responsabilité de Scintia</h3>
        <p className="mb-4 text-gray-600">
          Scintia s’engage à fournir les services souscrits avec diligence et professionnalisme, conformément aux
          dispositions des présentes CGV.
        </p>
        <p className="mb-4 text-gray-600">
          Toutefois, sa responsabilité ne saurait être engagée qu’en cas de faute prouvée, directe, exclusive et
          imputable à Scintia, ayant causé un dommage réel et certain au Client.
        </p>
        <p className="mb-4 text-gray-600">Scintia ne pourra en aucun cas être tenue responsable :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>De l’usage qui est fait des services par le Client ou ses utilisateurs ;</li>
          <li>
            Des conséquences d’une mauvaise configuration des agents IA liée à des données insuffisantes, imprécises ou
            erronées ;
          </li>
          <li>
            Des pertes d’exploitation, pertes de données, pertes de chiffre d’affaires, ou tout dommage indirect ;
          </li>
          <li>
            D’un dysfonctionnement temporaire ou d’une indisponibilité liée à une opération de maintenance, un incident
            réseau, un prestataire externe ou un cas de force majeure.
          </li>
        </ul>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">48. Responsabilité du Client</h3>
        <p className="mb-4 text-gray-600">Le Client est seul responsable :</p>
        <ul className="mb-4 list-inside list-disc text-gray-600">
          <li>
            De l’utilisation qu’il fait des agents IA, des scripts, des scénarios de réponse ou des automatisations
            qu’il configure ;
          </li>
          <li>
            De l’exactitude, de la légalité et de la pertinence des données transmises ou traitées via la plateforme ;
          </li>
          <li>
            Du respect des lois et réglementations applicables, notamment en matière de protection des données, de
            téléphonie, de consentement, et de communications commerciales.
          </li>
        </ul>
        <p className="mb-4 text-gray-600">
          Le Client garantit Scintia contre toute réclamation de tiers relative aux traitements réalisés via la
          plateforme pour son compte.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">49. Limitation de responsabilité</h3>
        <p className="mb-4 text-gray-600">
          En tout état de cause, la responsabilité globale de Scintia au titre de l’exécution des services, toutes
          causes et tous préjudices confondus, sera expressément limitée au montant total hors taxes payé par le Client
          au cours des douze (12) derniers mois précédant le fait générateur du dommage.
        </p>
        <p className="mb-4 text-gray-600">
          Cette limitation ne s’applique pas en cas de faute lourde ou dolosive prouvée de la part de Scintia.
        </p>
      </section>

      {/* Section 50: Droit applicable – Juridiction */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">50. Droit applicable – Juridiction</h2>
        <p className="mb-4 text-gray-600">
          Les présentes Conditions Générales de Vente, ainsi que l’ensemble des relations contractuelles entre Scintia
          et le Client, sont régies par le droit français, à l’exclusion de toute autre législation.
        </p>
        <p className="mb-4 text-gray-600">
          En cas de litige relatif à la validité, l’interprétation, l’exécution ou la cessation des présentes CGV et
          plus largement du contrat, les parties s’engagent à rechercher une solution amiable en priorité.
        </p>
        <p className="mb-4 text-gray-600">
          À défaut d’accord amiable dans un délai de trente (30) jours calendaires à compter de la notification écrite
          du différend par l’une des parties, le litige relèvera de la compétence exclusive des tribunaux de Lyon,
          nonobstant pluralité de défendeurs, appel en garantie ou procédure d’urgence.
        </p>
      </section>

      {/* Section 51: Dispositions finales */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">51. Dispositions finales</h2>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">52. Intégralité de l’accord</h3>
        <p className="mb-4 text-gray-600">
          Les présentes CGV, accompagnées du contrat ou bon de commande signé et, le cas échéant, de ses annexes,
          expriment l’intégralité de l’accord entre Scintia et le Client.
        </p>
        <p className="mb-4 text-gray-600">
          Elles prévalent sur tout document antérieur, proposition, échange ou communication contradictoire.
        </p>
        <p className="mb-4 text-gray-600">
          Aucune condition générale d’achat ou autre document émis par le Client ne pourra s’imposer à Scintia, sauf
          acceptation écrite et préalable.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">53. Non-renonciation</h3>
        <p className="mb-4 text-gray-600">
          Le fait pour l’une ou l’autre des parties de ne pas se prévaloir, à un moment donné, d’un manquement de
          l’autre partie à l’une quelconque de ses obligations contractuelles, ne saurait être interprété comme valant
          renonciation à s’en prévaloir ultérieurement.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">54. Divisibilité</h3>
        <p className="mb-4 text-gray-600">
          Si une clause des présentes CGV était déclarée nulle, illégale ou inapplicable par une juridiction compétente,
          cette clause serait réputée non écrite, sans affecter la validité des autres stipulations.
        </p>
        <p className="mb-4 text-gray-600">
          Les parties s’efforceront alors de substituer à cette clause une stipulation économiquement équivalente.
        </p>
        <h3 className="mb-2 font-medium text-gray-700 text-xl">55. Langue et version applicable</h3>
        <p className="mb-4 text-gray-600">
          Les présentes CGV sont rédigées en langue française, seule langue faisant foi en cas de litige.
        </p>
        <p className="mb-4 text-gray-600">En cas de traduction, la version française prévaudra.</p>
        <p className="mb-4 text-gray-600">
          Les présentes CGV valent accord de sous-traitance au sens de l’article 28 du RGPD. Aucune annexe séparée n’est
          nécessaire, sauf demande expresse du Client.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
