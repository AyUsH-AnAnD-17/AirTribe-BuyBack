import { AppShell, Container, Group, Title, Button, Badge, Anchor } from '@mantine/core'
import { IconShoppingCart, IconHome } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemsCount } from '../store/cartSlice'

const Layout = ({ children }) => {
  const cartItemsCount = useSelector(selectCartItemsCount)
  const location = useLocation()

  return (
    <AppShell
      header={{ height: 70 }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="xl" style={{ height: '100%' }}>
          <Group justify="space-between" style={{ height: '100%' }}>
            <Anchor component={Link} to="/" style={{ textDecoration: 'none' }}>
              <Group>
                <Title order={2} c="blue">AirtribeBuy</Title>
              </Group>
            </Anchor>

            <Group>
              {location.pathname !== '/' && (
                <Button
                  component={Link}
                  to="/"
                  variant="subtle"
                  leftSection={<IconHome size={16} />}
                >
                  Home
                </Button>
              )}

              <Button
                component={Link}
                to="/cart"
                variant="outline"
                leftSection={<IconShoppingCart size={16} />}
                rightSection={
                  cartItemsCount > 0 && (
                    <Badge size="sm" color="red" variant="filled">
                      {cartItemsCount}
                    </Badge>
                  )
                }
              >
                My Cart
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" mt="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout