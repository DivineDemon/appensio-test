const LegalNotice = () => {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 font-bold text-3xl text-gray-800 md:text-4xl">Mentions légales</h1>

      {/* Section: Editeur du site */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Editeur du site</h2>
        <p className="mb-2 text-gray-600">Scintia</p>
        <p className="mb-2 text-gray-600">Société par actions simplifiée (SAS)</p>
        <p className="mb-2 text-gray-600">Adresse du siège social : 3 RUE DE GENEVE, 69006 LYON</p>
        <p className="mb-2 text-gray-600">Numéro SIREN/SIRET : 93058174900015</p>
        <p className="mb-2 text-gray-600">Capital social : 3000,00 euros</p>
        <p className="mb-2 text-gray-600">Responsable de la publication : Azmi FEKIRI (Président – fondateur)</p>
        <p className="mb-2 text-gray-600">
          Contact :&nbsp;
          <a href="mailto:contact@scintia.ai" className="text-blue-600 hover:underline">
            contact@scintia.ai
          </a>
          &nbsp; / Tél : 0972731634
        </p>
      </section>

      {/* Section: Hébergement */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Hébergement</h2>
        <p className="mb-4 text-gray-600">
          Le site scintia.ai est hébergé par HOSTINGER, dont le siège social est situé HOSTINGER INTERNATIONAL LTD, 61
          Lordou Vironos Street, 6023 Larnaca, Chypre, joignable par le moyen suivant :&nbsp;
          <a href="https://www.hostinger.fr/contact" className="text-blue-600 hover:underline">
            https://www.hostinger.fr/contact
          </a>
          .
        </p>
      </section>

      {/* Section: Propriété intellectuelle */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Propriété intellectuelle</h2>
        <p className="mb-4 text-gray-600">
          L’ensemble des éléments du site scintia.ai (textes, images, logos, vidéos, structure, charte graphique, etc.)
          est protégé par la législation française sur la propriété intellectuelle et reste la propriété exclusive de la
          société Scintia, sauf mention contraire.
        </p>
        <p className="mb-4 text-gray-600">
          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du
          site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de
          Scintia.
        </p>
      </section>

      {/* Section: Données personnelles */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Données personnelles</h2>
        <p className="mb-4 text-gray-600">
          Pour plus d’informations concernant le traitement de vos données personnelles et vos droits, veuillez
          consulter notre&nbsp;
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            Politique de confidentialité
          </a>
          .
        </p>
      </section>

      {/* Section: Responsabilité */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Responsabilité</h2>
        <p className="mb-4 text-gray-600">
          Scintia met tout en œuvre pour offrir aux utilisateurs des informations fiables et actualisées, mais ne
          saurait être tenue responsable des erreurs, omissions ou d’une absence de disponibilité des informations.
        </p>
        <p className="mb-4 text-gray-600">
          L’utilisation du site se fait sous la seule responsabilité de l’utilisateur.
        </p>
      </section>

      {/* Section: Liens hypertextes */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Liens hypertextes</h2>
        <p className="mb-4 text-gray-600">
          Des liens hypertextes peuvent être présents sur le site en direction d’autres sites. Scintia n’exerce aucun
          contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

      {/* Section: Loi applicable */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Loi applicable</h2>
        <p className="mb-4 text-gray-600">
          Le site et ses conditions d’utilisation sont régis par le droit français. En cas de litige, les tribunaux du
          ressort du siège social de Scintia seront seuls compétents.
        </p>
      </section>

      {/* Section: Contact */}
      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Contact</h2>
        <p className="mb-4 text-gray-600">
          Pour toute question, remarque ou signalement, vous pouvez nous contacter à l’adresse suivante :&nbsp;
          <a href="mailto:contact@scintia.ai" className="text-blue-600 hover:underline">
            contact@scintia.ai
          </a>
        </p>
      </section>
    </div>
  );
};

export default LegalNotice;
