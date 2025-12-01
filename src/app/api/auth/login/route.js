import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';

export async function POST(req) {
  await connectDB();

  try {
    const { email, senha } = await req.json();

    // --- ÁREA DE ESPIONAGEM ---
    console.log("------------------------------------------------");
    console.log("🕵️ TENTATIVA DE LOGIN:");
    console.log(`   Usuário digitado: '${email}'`);
    console.log(`   Senha digitada:   '${senha}'`);

    // Vamos ver o que REALMENTE tem no banco
    const allUsers = await User.find({});
    console.log("🕵️ O QUE TEM NO BANCO AGORA:");
    if (allUsers.length === 0) {
      console.log("   ⚠️ O BANCO ESTÁ VAZIO! NENHUM USUÁRIO ENCONTRADO.");
    } else {
      allUsers.forEach(u => {
        console.log(`   -> ID: ${u._id} | User: '${u.user}' | Senha: '${u.pwd}' | Status: ${u.status}`);
      });
    }
    console.log("------------------------------------------------");
    // ---------------------------

    const foundUser = await User.findOne({ user: email, pwd: senha });

    if (!foundUser) {
      return NextResponse.json(
        { message: 'Usuário ou senha incorretos' },
        { status: 401 }
      );
    }

    if (foundUser.status !== 'on') {
      return NextResponse.json(
        { message: 'Usuário inativo.' },
        { status: 403 }
      );
    }

    const { pwd, ...userData } = foundUser._doc;
    
    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      user: userData
    }, { status: 200 });

  } catch (error) {
    console.error('Erro login:', error);
    return NextResponse.json(
      { message: 'Erro interno' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import connectDB from '@/db';
// import User from '@/models/user';

// export async function POST(req) {
//   await connectDB();

//   try {
//     // 1. Pega os dados enviados pelo formulário de login
//     const { user, pwd } = await req.json();

//     // 2. Busca no banco um usuário que tenha ESSE user E ESSA senha
//     // Atenção: Num projeto real usaríamos bcrypt para a senha, 
//     // mas para seu trabalho acadêmico (conforme o PDF) pode ser comparação direta.
//     const foundUser = await User.findOne({ user, pwd });

//     // 3. Se não achar ninguém, retorna erro 401 (Não autorizado)
//     if (!foundUser) {
//       return NextResponse.json(
//         { message: 'Usuário ou senha incorretos' },
//         { status: 401 }
//       );
//     }

//     // 4. Se achar, verifica se o status está "on" (opcional, mas recomendado)
//     if (foundUser.status !== 'on') {
//       return NextResponse.json(
//         { message: 'Usuário inativo. Contate o administrador.' },
//         { status: 403 }
//       );
//     }

//     // 5. Retorna sucesso e os dados do usuário (sem a senha) para o Front guardar na sessão
//     const { pwd: password, ...userData } = foundUser._doc;
    
//     return NextResponse.json({
//       message: 'Login realizado com sucesso!',
//       user: userData
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Erro no login:', error);
//     return NextResponse.json(
//       { message: 'Erro interno no servidor' },
//       { status: 500 }
//     );
//   }
// }