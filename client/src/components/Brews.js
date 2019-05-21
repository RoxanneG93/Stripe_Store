import React, { Component } from 'react'
import Strapi from 'strapi-sdk-javascript/build/main';
import { Box, Heading, Text, Image, Card, Button, Mask, IconButton } from 'gestalt';
import { calculatePrice, getCart, setCart } from '../components/utils/index'
import { Link } from 'react-router-dom';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

export default class Brews extends Component {
    state = {
        brews: [],
        brand: '',
        cartItems: []
    }







    async componentDidMount() {
        console.log(this.props)
        const response = await strapi.request('POST', 'graphql', {
            data: {
                query: `query {
                    brand(id: "${this.props.match.params.brandId}"){
                      _id
                      name
                      brews {
                        _id
                        name
                        description
                        image {
                          url
                        }
                        price
                      }
                    }
                  }`
            }
        })
        this.setState({
            brews: response.data.brand.brews,
            brand: response.data.brand.name,
            cartItems: getCart()
        })
        //console.log(this.props.match.params.brandId);
        console.log(response);
    }


    addToCart = brew => {
        const alreadyInCart = this.state.cartItems.findIndex(item => item._id === brew._id);
        if (alreadyInCart === -1) {
            const updatedItems = this.state.cartItems.concat({
                ...brew,
                quantity: 1
            });
            this.setState({ cartItems: updatedItems });
        } else {
            const updatedItems = [...this.state.cartItems];
            updatedItems[alreadyInCart].quantity += 1;
            this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
        }
    }


    deleteFromCart = id => {
        const filteredItems = this.state.cartItems.filter(item => item._id !== id);
        this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
    }




    render() {
        const { brand, brews, cartItems } = this.state;
        return (
            <Box display="flex" justifyContent="center" alignItems="start">
                <Box display="flex" direction="column" alignItems="center">
                    <Box>
                        <Heading>{brand}</Heading>
                    </Box>
                </Box>
                <Box>
                    {brews.map(brew =>
                        <Box key={brew._id} height={200} width={200}>
                            <Card
                                image={
                                    <Box width={200} margin={2}>
                                        <Image src={`${apiUrl}${brew.image.url}`} alt="brand" naturalHeight={1} naturalWidth={1} />
                                    </Box>
                                }>
                                <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                                    <Text bold size="xl">{brew.name}</Text>
                                    <Text >{brew.description}</Text>
                                    <Text >{brew.price}</Text>
                                    <Button onClick={() => this.addToCart(brew)} color="blue" text="Add to Cart"></Button>
                                </Box>

                            </Card>
                        </Box>
                    )}
                </Box>
                <Box>
                    <Mask>
                        <Box>
                            <Heading>User Cart</Heading>
                            <Text>{cartItems.length} items selected.</Text>
                            <Box>
                                <Box>
                                    {cartItems.length === 0 && (
                                        <Text color="red">Plese select some items</Text>
                                    )}
                                </Box>
                                <Box>
                                    {cartItems.map(item =>
                                        <React.Fragment>
                                            <Box key={item.id}>
                                                <Text>{item.name} X {item.quantity} - {(item.quantity * item.price)}</Text>
                                            </Box>
                                            <IconButton
                                                accessibilityLabel="Delete Item"
                                                icon="cancel"
                                                size="sm"
                                                iconColor="red"
                                                onClick={() => this.deleteFromCart(item._id)}
                                            />
                                        </React.Fragment>
                                    )}
                                </Box>
                                <Text>Total: {calculatePrice(cartItems)}</Text>
                                <Link to="/checkout">Checkout</Link>
                            </Box>
                        </Box>
                    </Mask>
                </Box>

            </Box>

        )
    }
}
