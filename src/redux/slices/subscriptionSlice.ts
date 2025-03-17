import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
};

type SubscriptionState = {
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  billingCycle: 'monthly' | 'annual';
  loading: boolean;
  error: string | null;
};

const initialState: SubscriptionState = {
  plans: [
    {
      id: 'basic',
      name: 'Básico',
      price: {
        monthly: 6000,
        annual: 5000,
      },
      features: [
        'Acceso a contenido exclusivo',
        'Participación en comunidad',
        'Newsletter mensual'
      ],
    },
    {
      id: 'standard',
      name: 'Estándar',
      price: {
        monthly: 8000,
        annual: 6500,
      },
      features: [
        'Todo lo del plan Básico',
        'Descuentos en eventos',
        'Acceso anticipado a contenidos'
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: {
        monthly: 12000,
        annual: 10000,
      },
      features: [
        'Todo lo del plan Estándar',
        'Contenido sin publicidad',
        'Merchandising exclusivo'
      ],
    },
    {
      id: 'gold',
      name: 'Gold',
      price: {
        monthly: 18000,
        annual: 15000,
      },
      features: [
        'Todo lo del plan Premium',
        'Acceso a eventos privados',
        'Mención en créditos'
      ],
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: {
        monthly: 24000,
        annual: 20000,
      },
      features: [
        'Todo lo del plan Gold',
        'Sesiones exclusivas con creadores',
        'Contenido personalizado'
      ],
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: {
        monthly: 30000,
        annual: 25000,
      },
      features: [
        'Todo lo del plan Platinum',
        'Participación en decisiones editoriales',
        'Acceso a archivo histórico completo'
      ],
    },
  ],
  selectedPlan: null,
  billingCycle: 'monthly',
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    selectPlan: (state, action: PayloadAction<string>) => {
      const plan = state.plans.find(p => p.id === action.payload);
      if (plan) {
        state.selectedPlan = plan;
      }
    },
    setBillingCycle: (state, action: PayloadAction<'monthly' | 'annual'>) => {
      state.billingCycle = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { selectPlan, setBillingCycle, setLoading, setError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;