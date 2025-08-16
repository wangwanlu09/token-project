# 组件架构说明

## 🏗️ 正确的组件分层

### 📁 **新的文件结构**：

```
frontend/src/components/
├── ui/                 # 通用UI组件库
│   ├── Button.tsx      # ✅ 可复用的按钮组件
│   └── Card.tsx        # ✅ 可复用的卡片组件
├── NavBar.tsx          # ✅ 业务导航组件
├── ConnectWallet.tsx   # ✅ 钱包连接业务组件
├── TokenInfo.tsx       # ✅ 代币信息业务组件
└── ClaimToken.tsx      # ✅ 代币领取业务组件
```

## 🎯 **组件分类原则**

### UI组件 (`ui/` 文件夹)
**特点**：
- ✅ **通用性**：可以在任何项目中复用
- ✅ **无业务逻辑**：只负责展示和基础交互
- ✅ **高可配置性**：通过props控制样式和行为
- ✅ **独立性**：不依赖特定的业务逻辑

**例子**：
```typescript
// ✅ Button.tsx - 通用按钮
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

// ✅ Card.tsx - 通用卡片容器
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

### 业务组件 (直接在 `components/` 下)
**特点**：
- ✅ **业务相关**：包含具体的业务逻辑
- ✅ **项目特定**：与当前Cheetos项目紧密相关
- ✅ **功能完整**：实现完整的业务功能
- ✅ **数据处理**：处理合约数据、用户交互等

**例子**：
```typescript
// ✅ NavBar.tsx - Cheetos项目的导航栏
export function NavBar() {
  return (
    <nav>
      <h1>🧀 Cheetos DApp</h1>  // 项目特定
    </nav>
  );
}

// ✅ ConnectWallet.tsx - 钱包连接逻辑
export function ConnectWallet() {
  const { connect, isConnected } = useAccount();
  // 业务逻辑...
}
```

## 📊 **对比总结**

| 组件类型 | 位置 | 特点 | 例子 |
|---------|------|------|------|
| **UI组件** | `ui/` | 通用、可复用、无业务逻辑 | Button, Card, Input, Modal |
| **业务组件** | `components/` | 业务相关、项目特定、有完整功能 | NavBar, ConnectWallet, TokenInfo |

## 🎉 **你的观察很正确！**

NavBar确实不应该放在`ui/`文件夹中，因为：
- ❌ 它包含Cheetos项目特定的内容
- ❌ 它不是一个可复用的通用组件
- ❌ 它有特定的业务逻辑

现在的结构更加合理和清晰！👍


