import { useUser } from "../lib/context/user";

export function Home() {
  const {logout} = useUser();
    return (
    
    <div>
        <p>I'm the home page</p>          
        <button
            className="button"
            type="button"
            onClick={logout}>
            Salir
          </button></div>
  );
}
