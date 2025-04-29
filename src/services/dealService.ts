
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Deal {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discount_percentage: number;
  status: "active" | "pending" | "expired";
  expiry_date: string;
  image_url?: string;
  country: string;
  vendor_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDealDto {
  title: string;
  description: string;
  category: string;
  price?: number;
  discount_percentage?: number;
  expiry_date: string;
  country: string;
  image_url?: string;
}

export async function getVendorDeals(vendorId: string) {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("vendor_id", vendorId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Deal[];
  } catch (error: any) {
    toast.error(error.message || "Error fetching vendor deals");
    return [];
  }
}

export async function createDeal(dealData: CreateDealDto, vendorId: string) {
  try {
    const { data, error } = await supabase
      .from("deals")
      .insert([{
        ...dealData,
        vendor_id: vendorId,
        status: "pending", // New deals start as pending
      }])
      .select();

    if (error) throw error;
    toast.success("Deal submitted for review");
    return data[0] as Deal;
  } catch (error: any) {
    toast.error(error.message || "Error creating deal");
    throw error;
  }
}

export async function updateDeal(dealId: string, dealData: Partial<CreateDealDto>) {
  try {
    const { data, error } = await supabase
      .from("deals")
      .update({
        ...dealData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dealId)
      .select();

    if (error) throw error;
    toast.success("Deal updated successfully");
    return data[0] as Deal;
  } catch (error: any) {
    toast.error(error.message || "Error updating deal");
    throw error;
  }
}

export async function deleteDeal(dealId: string) {
  try {
    const { error } = await supabase
      .from("deals")
      .delete()
      .eq("id", dealId);

    if (error) throw error;
    toast.success("Deal deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(error.message || "Error deleting deal");
    throw error;
  }
}

export async function changeDealStatus(dealId: string, status: "active" | "pending" | "expired") {
  try {
    const { data, error } = await supabase
      .from("deals")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dealId)
      .select();

    if (error) throw error;
    toast.success(`Deal ${status === "active" ? "activated" : status === "expired" ? "expired" : "paused"} successfully`);
    return data[0] as Deal;
  } catch (error: any) {
    toast.error(error.message || "Error changing deal status");
    throw error;
  }
}
