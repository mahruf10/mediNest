import { SellerOrderItemsTable, SellerOrderItem } from "../../../components/sellerComp/ordertable"

const data: SellerOrderItem[] = [
  {
    id: "1",
    orderNumber: "10234",
    productName: "Cotton Panjabi",
    sku: "PNJ-001",
    variant: "Navy / L",
    quantity: 2,
    unitPrice: 1450,
    customerName: "Rahim Uddin",
    status: "pending",
    orderedAt: "2026-11-08T10:30:00Z",
  },
]


export default function SellerOrderPage() {
  return (
    <div>
      <SellerOrderItemsTable data={data} />
    </div>
  )
}