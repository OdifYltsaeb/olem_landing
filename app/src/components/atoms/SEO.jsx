/**
 * SEO component for persitent header
 */
import Head from 'next/head';

// TODO: This is old, pages router based approach and needs to be changed.
const SEO = function ({ description = '', meta = [], title = '' }) {
    const metaData = {
        title: 'AT SAAS',
        description: 'AT SAAS',
        email: 'some.email@somesite.com',
        phone: '+1 888 ADDPHONE',
        author: '',
    };
    const metaDescription = description || metaData.description;
    const metaTitle = title ? `${title} | ${metaData.title}` : metaData.title;
    const metaContent = [
        {
            name: `viewport`,
            content: 'width=device-width, initial-scale=1.0',
        },
        {
            name: `description`,
            content: metaDescription,
        },
        // {
        //     property: 'image',
        //     content: Image,
        // },
        {
            property: `og:title`,
            content: metaTitle,
        },
        {
            property: `og:description`,
            content: metaDescription,
        },
        {
            property: `og:type`,
            content: `website`,
        },
        // {
        //     property: `og:image`,
        //     content: Image,
        // },
        {
            name: `twitter:card`,
            content: `summary`,
        },
        {
            name: `twitter:creator`,
            content: metaData.author || ``,
        },
        {
            name: `twitter:title`,
            content: metaTitle,
        },
        {
            name: `twitter:description`,
            content: metaDescription,
        },
        // {
        //     name: `twitter:image`,
        //     content: Image,
        // },
    ].concat(meta);

    return (
        <Head>
            <title>{metaTitle}</title>
            {metaContent.map((item) => (
                <meta {...item} key={item.property || item.name} />
            ))}
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "url": "https://yoursite.com",
                        "name": "Your Site",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "availableLanguage": "English",
                            "email": "${metaData.email}",
                            "telephone": "${metaData.phone}",
                            "contactType": "Sales"
                        }
                    }
              `}
            </script>
        </Head>
    );
};

SEO.defaultProps = {
    meta: [],
    description: ``,
    title: ``,
};

export default SEO;
