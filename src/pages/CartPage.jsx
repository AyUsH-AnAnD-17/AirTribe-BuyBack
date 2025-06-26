import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Image,
  NumberInput,
  Divider,
  Center,
  ActionIcon,
  Grid,
  Paper,
} from '@mantine/core'
import { IconTrash, IconShoppingBag, IconArrowLeft } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const cartItemsCount = useSelector(selectCartItemsCount)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id, title) => {
    dispatch(removeFromCart(id))
    notifications.show({
      title: 'Item Removed',
      message: `${title} removed from cart`,
      color: 'orange',
    })
  }

  const handleBuyNow = () => {
    notifications.show({
      title: 'Order Successful!',
      message: 'Order successfully placed. Thank you for shopping with us!',
      color: 'green',
      autoClose: 3000,
    })
    
    dispatch(clearCart())
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <Stack gap="xl" align="center" style={{ minHeight: '60vh' }} justify="center">
        <IconShoppingBag size={80} color="gray" />
        <Stack align="center" gap="md">
          <Title order={2}>Your cart is empty</Title>
          <Text c="dimmed" ta="center">
            Looks like you haven't added any items to your cart yet.
          </Text>
          <Button size="lg" onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <div>
          <Title order={1}>My Cart</Title>
          <Text c="dimmed">
            {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} in your cart
          </Text>
        </div>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="md">
            {cartItems.map((item) => (
              <Card key={item.id} shadow="sm" padding="lg" withBorder>
                <Group align="flex-start" wrap="nowrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                    style={{ flexShrink: 0 }}
                  />
                  
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={500} size="md" lineClamp={2}>
                      {item.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {item.category}
                    </Text>
                    <Text fw={600} c="blue">
                      {formatPrice(item.price)} each
                    </Text>
                  </Stack>
                  
                  <Stack gap="xs" align="flex-end" style={{ minWidth: 120 }}>
                    <Group gap="xs">
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(item.id, value)}
                        min={1}
                        max={10}
                        size="sm"
                        w={70}
                      />
                      <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => handleRemoveItem(item.id, item.title)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                    <Text fw={700} size="lg">
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper shadow="sm" p="lg" withBorder style={{ position: 'sticky', top: 20 }}>
            <Stack gap="md">
              <Title order={3}>Order Summary</Title>
              <Divider />
              
              <Group justify="space-between">
                <Text>Subtotal ({cartItemsCount} items)</Text>
                <Text>{formatPrice(cartTotal)}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text>Shipping</Text>
                <Text c="green">Free</Text>
              </Group>
              
              <Divider />
              
              <Group justify="space-between">
                <Text fw={700} size="lg">Total</Text>
                <Text fw={700} size="lg" c="blue">
                  {formatPrice(cartTotal)}
                </Text>
              </Group>
              
              <Button
                size="lg"
                fullWidth
                onClick={handleBuyNow}
                leftSection={<IconShoppingBag size={20} />}
              >
                Buy Now
              </Button>
              
              <Text size="xs" c="dimmed" ta="center">
                By placing your order, you agree to our terms and conditions.
              </Text>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

export default CartPage