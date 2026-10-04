import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <Skeleton className="skeleton-image" width="100%" height="200px" />
      <div className="skeleton-card-content">
        <Skeleton className="skeleton-text" width="80%" height="1.25rem" />
        <Skeleton className="skeleton-text" width="60%" height="1rem" />
        <Skeleton className="skeleton-text" width="50%" height="1rem" />
        <Skeleton className="skeleton-button" width="100%" height="2.5rem" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="skeleton-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="category-skeleton">
      <Skeleton className="skeleton-image" width="100%" height="160px" />
      <div className="p-3">
        <Skeleton className="skeleton-text" width="70%" height="1.25rem" />
        <Skeleton className="skeleton-text" width="40%" height="1rem" />
      </div>
    </div>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="skeleton-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="cart-item-skeleton" style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid var(--gray-100)" }}>
      <Skeleton className="skeleton-image" width="80px" height="80px" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton className="skeleton-text" width="60%" height="1rem" />
        <Skeleton className="skeleton-text" width="40%" height="0.875rem" />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Skeleton className="skeleton-input" width="60px" />
          <Skeleton className="skeleton-text" width="40%" height="1rem" />
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton({ itemCount = 3 }: { itemCount?: number }) {
  return (
    <div className="cart-skeleton">
      {Array.from({ length: itemCount }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--gray-200)" }}>
        <Skeleton className="skeleton-text" width="80px" height="1.25rem" />
        <Skeleton className="skeleton-text" width="100px" height="1.25rem" />
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="order-card-skeleton" style={{ padding: "1.5rem", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-card)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Skeleton className="skeleton-text" width="120px" height="1rem" />
        <Skeleton className="skeleton-badge" />
      </div>
      <Skeleton className="skeleton-text" width="60%" height="1rem" />
      <Skeleton className="skeleton-text" width="100%" height="1rem" />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--gray-100)" }}>
        <Skeleton className="skeleton-text" width="80px" height="1.25rem" />
        <Skeleton className="skeleton-text" width="100px" height="1.25rem" />
      </div>
    </div>
  );
}

export function OrderListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="order-list-skeleton" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="stat-skeleton" style={{ background: "white", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-card)", padding: "1.5rem" }}>
      <Skeleton className="skeleton-text" width="80px" height="0.875rem" />
      <Skeleton className="skeleton-text" width="100px" height="2rem" style={{ marginTop: "0.5rem" }} />
    </div>
  );
}

export function DashboardStatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <DashboardStatSkeleton key={i} />
      ))}
    </div>
  );
}

export function DashboardTableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="table-skeleton" style={{ background: "white", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, padding: "1rem", background: "var(--gray-50)", borderBottom: "1px solid var(--gray-200)" }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="skeleton-text" width="80%" height="0.875rem" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, padding: "1rem", borderBottom: "1px solid var(--gray-100)" }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="skeleton-text" width="70%" height="1rem" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function FormFieldSkeleton({ label = true }: { label?: boolean }) {
  return (
    <div className="form-field-skeleton" style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      {label && <Skeleton className="skeleton-text" width="80px" height="0.875rem" />}
      <Skeleton className="skeleton-input" />
    </div>
  );
}

export function FormSkeleton({ fields = 5 }: { fields?: number }) {
  return (
    <div className="form-skeleton" style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      {Array.from({ length: fields }).map((_, i) => (
        <FormFieldSkeleton key={i} />
      ))}
      <Skeleton className="skeleton-button" style={{ marginTop: "1rem" }} />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="profile-skeleton" style={{ display: "flex", gap: "1.5rem", padding: "1.5rem", background: "white", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-card)" }}>
      <Skeleton className="skeleton-avatar" width="80px" height="80px" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Skeleton className="skeleton-text" width="150px" height="1.5rem" />
        <Skeleton className="skeleton-text" width="200px" height="1rem" />
        <Skeleton className="skeleton-text" width="200px" height="1rem" />
        <Skeleton className="skeleton-button" width="150px" />
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="review-skeleton" style={{ padding: "1.5rem", background: "white", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <Skeleton className="skeleton-avatar" width="48px" height="48px" />
        <div>
          <Skeleton className="skeleton-text" width="150px" height="1.25rem" />
          <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.25rem" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} width="1.25rem" height="1.25rem" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="skeleton-text" width="80%" height="1rem" />
      <Skeleton className="skeleton-text" width="100%" height="1rem" />
      <Skeleton className="skeleton-text" width="60%" height="1rem" />
    </div>
  );
}

export function ReviewListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="review-list-skeleton" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="hero-skeleton" style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%)" }}>
      <div style={{ maxWidth: "600px", padding: "2rem" }}>
        <Skeleton className="skeleton-text" width="200px" height="1.5rem" style={{ marginBottom: "1rem" }} />
        <Skeleton className="skeleton-text" width="100%" height="3rem" style={{ marginBottom: "1.5rem" }} />
        <Skeleton className="skeleton-text" width="100%" height="1.5rem" style={{ marginBottom: "2rem" }} />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Skeleton className="skeleton-button" width="150px" />
          <Skeleton className="skeleton-button" width="150px" />
        </div>
      </div>
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <header className="nav-skeleton" style={{ background: "white", borderBottom: "1px solid var(--gray-200)", padding: "1rem 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto" }}>
        <Skeleton className="skeleton-avatar" width="40px" height="40px" />
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="skeleton-text" width="80px" height="1rem" />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Skeleton className="skeleton-input" width="200px" />
          <Skeleton className="skeleton-avatar" width="40px" height="40px" />
          <Skeleton className="skeleton-button" width="100px" />
        </div>
      </div>
    </header>
  );
}