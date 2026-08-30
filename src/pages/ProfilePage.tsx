// Mariano Montini ('bosque', 'bosquestudio')
import { Profile } from "../components/Profile";

export function Profile() {
  const { data, loading, error } = useProfileData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Please connect your wallet</div>;
  
  return <div>{/* Render profile */}</div>;
}
