import { supabase } from "../lib/supabaseClient";
import { type Song } from "../../types/types.ts";

export const getSongs = async (): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
};

export const getSongsByUserId = async (): Promise<Song[]> => {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export const getSongsBytitle = async (title: string): Promise<Song[]> => {
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
};

export const getLikedSongs = async (): Promise<Song[]> => {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*,songs(*)")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  console.log(data);

  return data.map((item) => ({
    ...item.songs,
  }));

  return (data as any) || [];
};

export const getSongBySongId = async (id: string) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};
