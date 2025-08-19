# Component Architecture Guide

## 🏗️ Proper Component Layering

### 📁 **New File Structure**:

```
frontend/src/components/
├── ui/                 # Generic UI component library
│   ├── Button.tsx      # ✅ Reusable button component
│   └── Card.tsx        # ✅ Reusable card component
├── NavBar.tsx          # ✅ Business navigation component
├── ConnectWallet.tsx   # ✅ Wallet connection business component
├── TokenInfo.tsx       # ✅ Token information business component
└── ClaimToken.tsx      # ✅ Token claim business component
```

## 🎯 **Component Classification Principles**

### UI Components (`ui/` folder)
**Characteristics**:
- ✅ **Generic**: Can be reused in any project
- ✅ **No Business Logic**: Only responsible for display and basic interaction
- ✅ **Highly Configurable**: Control style and behavior through props
- ✅ **Independent**: Not dependent on specific business logic

**Examples**:
```typescript
// ✅ Button.tsx - Generic button
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

// ✅ Card.tsx - Generic card container
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

### Business Components (directly under `components/`)
**Characteristics**:
- ✅ **Business Related**: Contains specific business logic
- ✅ **Project Specific**: Closely related to the current Cheetos project
- ✅ **Complete Functionality**: Implements complete business functions
- ✅ **Data Processing**: Handles contract data, user interactions, etc.

**Examples**:
```typescript
// ✅ NavBar.tsx - Navigation bar for Cheetos project
export function NavBar() {
  return (
    <nav>
      <h1>🧀 Cheetos DApp</h1>  // Project specific
    </nav>
  );
}

// ✅ ConnectWallet.tsx - Wallet connection logic
export function ConnectWallet() {
  const { connect, isConnected } = useAccount();
  // Business logic...
}
```

## 📊 **Comparison Summary**

| Component Type | Location | Characteristics | Examples |
|---------|------|------|------|
| **UI Components** | `ui/` | Generic, reusable, no business logic | Button, Card, Input, Modal |
| **Business Components** | `components/` | Business related, project specific, complete functionality | NavBar, ConnectWallet, TokenInfo |

## 🎉 **Your observation is correct!**

NavBar should indeed not be placed in the `ui/` folder because:
- ❌ It contains Cheetos project-specific content
- ❌ It's not a reusable generic component
- ❌ It has specific business logic

The current structure is more reasonable and clear! 👍


