import supabase from '../db/supabase.js';

export const getApplicants = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Applications')
      .select('*');
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 