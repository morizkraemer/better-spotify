import { AUTH_URL } from "../authorization_config";
export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <a href={AUTH_URL}>
        <button className="w-56 h-16 rounded-full bg-sgreen text-black">
          Login with Spotify
        </button>
      </a>
    </div>
  );
}
