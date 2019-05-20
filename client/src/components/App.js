import React, { Component } from 'react';
import './App.css';
import { Box, Container, Heading, Card, Image, Text } from 'gestalt';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {

  state = {
    brands: []
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
            brands {
              _id
              name
              description
              createdAt
              image {
                url
                name
              }
            }
          }`
        }
      })
      //console.log(response);
      this.setState({ brands: response.data.brands })
    } catch (err) {
      console.log(err);
    }

  }


  render() {
    const { brands } = this.state;
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="around"
          margingBottom={2}
        >
          <Heading color="midnight" size="md">
            Brew Brands
      </Heading>


          <Box display="flex" justifyContent="center">
            {brands.map(brand =>
              <Box key={brand._id} height={200} width={200}>
                <Card
                  image={
                    <Box width={200} margin={2}>
                      <Image src={`${apiUrl}${brand.image.url}`} alt="brand" naturalHeight={1} naturalWidth={1} />
                    </Box>
                  }>
                  <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                    <Text bold size="xl">{brand.name}</Text>
                    <Text >{brand.description}</Text>
                    <Link to={`/${brand._id}`} size="xl">See {brand.name}</Link>
                  </Box>

                </Card>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    );
  }
}

export default App;
