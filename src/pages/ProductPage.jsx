import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
  Image,
  Title,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  NumberInput,
  Rating,
  Loader,
  Center,
  Alert,
  Divider,
} from '@mantine/core'
import { IconShoppingCartPlus, IconArrowLeft } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { fetchProduct, clearSelectedProduct } from '../store/productSlice'
import { addToCart } from '../store/cartSlice'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProduct(id))
    
    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      dispatch(addToCart({ product, quantity }))
      notifications.show({
        title: 'Success!',
        message: `${quantity} ${product.title} added to cart`,
        color: 'green',
      })
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (loading) {
    return (
      <Center style={{ minHeight: '60vh' }}>
        <Stack align="center" gap="md">
          <Loader size="lg" variant="dots" />
          <Text>Loading product details...</Text>
        </Stack>
      </Center>
    )
  }

  if (error) {
    return (
      <Alert icon={<IconArrowLeft size={16} />} title="Error!" color="red">
        Failed to load product: {error}
        <Button variant="light" onClick={() => navigate('/')} mt="md">
          Go back to home
        </Button>
      </Alert>
    )
  }

  if (!product) {
    return (
      <Center style={{ minHeight: '60vh' }}>
        <Stack align="center" gap="md">
          <Text>Product not found</Text>
          <Button onClick={() => navigate('/')}>Go back to home</Button>
        </Stack>
      </Center>
    )
  }

  return (
    <Stack gap="xl">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => navigate('/')}
        w="fit-content"
      >
        Back to Products
      </Button>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Badge color="blue" variant="light" size="lg" w="fit-content">
              {product.category}
            </Badge>

            <Title order={1}>{product.title}</Title>

            <Group gap="sm">
              <Rating value={product.rating?.rate || 0} fractions={2} readOnly />
              <Text size="sm" c="dimmed">
                ({product.rating?.count || 0} reviews)
              </Text>
            </Group>

            <Text fw={700} size="xl" c="blue">
              {formatPrice(product.price)}
            </Text>

            <Divider />

            <Text size="md" style={{ lineHeight: 1.6 }}>
              {product.description}
            </Text>

            <Divider />

            <Stack gap="md">
              <Text fw={500}>Quantity:</Text>
              <NumberInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
                style={{ maxWidth: 120 }}
              />

              <Group>
                <Button
                  size="lg"
                  leftSection={<IconShoppingCartPlus size={20} />}
                  onClick={handleAddToCart}
                  disabled={quantity < 1}
                >
                  Add to Cart
                </Button>
                <Text size="sm" c="dimmed">
                  Total: {formatPrice(product.price * quantity)}
                </Text>
              </Group>
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

export default ProductPage