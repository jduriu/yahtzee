import { z } from 'zod';

const User = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

const Login = User.pick({username: true, password: true})

export { User, Login };
