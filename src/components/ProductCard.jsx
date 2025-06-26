import { Card, Image, Text, Badge, Button, Group, Stack, Rating } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const truncateTitle = (title, maxLength = 60) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
      <Card.Section>
        <Image
          src={product.image}
          height={200}
          alt={product.title}
          className="product-image"
        />
      </Card.Section>

      <Stack justify="space-between" style={{ height: 'calc(100% - 200px)' }} mt="md">
        <Stack gap="xs">
          <Badge color="blue" variant="light" size="sm">
            {product.category}
          </Badge>

          <Text fw={500} size="sm" lineClamp={2}>
            {truncateTitle(product.title)}
          </Text>

          <Group gap="xs">
            <Rating value={product.rating?.rate || 0} fractions={2} readOnly size="xs" />
            <Text size="xs" c="dimmed">
              ({product.rating?.count || 0})
            </Text>
          </Group>

          <Text fw={700} size="lg" c="blue">
            {formatPrice(product.price)}
          </Text>
        </Stack>

        <Button
          component={Link}
          to={`/product/${product.id}`}
          fullWidth
          leftSection={<IconEye size={16} />}
          variant="light"
        >
          View Details
        </Button>
      </Stack>
    </Card>
  )
}

export default ProductCard