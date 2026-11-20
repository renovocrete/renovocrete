import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ select: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: {
 auth: { onAuthStateChange: () => ({data:{subscription:{unsubscribe:vi.fn()}}}), getSession: async () => ({data:{session:{user:{id:'admin-user'}}}}) },
 from: () => ({select: () => ({eq:mocks.select})}),
} }));
import { useAuth } from '@/hooks/useAuth';
it('keeps admin access loading until server roles have been loaded', async () => {
 let complete: ((value:unknown)=>void) | undefined;
 mocks.select.mockImplementation(() => new Promise(resolve => { complete=resolve; }));
 const {result}=renderHook(()=>useAuth());
 await waitFor(()=>expect(mocks.select).toHaveBeenCalled());
 expect(result.current.loading).toBe(true);
 await act(async()=>{complete?.({data:[{role:'admin'}],error:null});});
 await waitFor(()=>expect(result.current.loading).toBe(false));
 expect(result.current.isAdmin).toBe(true);
});