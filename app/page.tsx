import { JwtPayload } from "@/security/types/SecurityTypes";
import { decodeJwt, getRolesAndPermission } from "@/security/utils/DecodeRolePermission";

export default function Home() {

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsc2xha3NobWFuMjA0QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwicGVybWlzc2lvbnMiOlsidG9kbzpjcmVhdGUiLCJ0b2RvOmRlbGV0ZSIsInRvZG86dXBkYXRlIiwidG9kbzpyZWFkIl0sImlkIjoxMSwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNzcxOTY2ODQ1LCJleHAiOjE3NzE5Njc3NDV9.GgXsgBXY7NtogzPw7_QMD5inB5-uIZLSbsYgo5ALdHs";

  const payload = getRolesAndPermission(token);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="flex justify-center items-center">THis is the advance todo</h1>
      <div>
        {payload?.permissions?.map(p => (
          <div key={p}>
            <h1>{p}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}