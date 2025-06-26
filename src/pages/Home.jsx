import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Title, Text, Loader, Center, Alert, Stack } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { fetchProducts } from '../store/productSlice'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  if (loading) {
    return (
      <Center style={{ minHeight: '60vh' }}>
        <Stack align="center" gap="md">
          <Loader size="lg" variant="dots" />
          <Text>Loading amazing products...</Text>
        </Stack>
      </Center>
    )
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
        Failed to load products: {error}
      </Alert>
    )
  }

  return (
    <Stack gap="xl">
      <div>
        <Title order={1} mb="sm">Welcome to AirtribeBuy</Title>
        <Text size="lg" c="dimmed">
          Discover amazing products at great prices. Shop with confidence!
        </Text>
      </div>

      <div>
        <Title order={2} mb="md">Featured Products</Title>
        <Grid>
          {products.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </div>

      {products.length === 0 && !loading && (
        <Center style={{ minHeight: '40vh' }}>
          <Text size="lg" c="dimmed">No products available at the moment.</Text>
        </Center>
      )}
    </Stack>
  )
}

export default Home