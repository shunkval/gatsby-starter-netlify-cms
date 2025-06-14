import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <div
      className="w-full h-[350px] bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg bg-orange-500/90 px-4 py-2 rounded mb-4 inline-block"
        >
          {title}
        </h1>
        <h3
          className="text-xl md:text-2xl font-semibold text-white bg-orange-500/80 px-4 py-2 rounded drop-shadow inline-block"
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">{mainpitch.title}</h2>
          <p className="text-lg text-gray-600">{mainpitch.description}</p>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-semibold mb-2">{heading}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
        <Features gridItems={intro.blurbs} />
        <div className="flex justify-center my-8">
          <Link className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow transition" to="/products">
            See all products
          </Link>
        </div>
        <div className="my-12">
          <h3 className="text-2xl font-semibold mb-4 text-center">Latest stories</h3>
          <BlogRoll />
          <div className="flex justify-center mt-6">
            <Link className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded shadow transition" to="/blog">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
