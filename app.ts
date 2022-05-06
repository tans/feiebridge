import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router.post("/", async (ctx) => {
    const body = await ctx.request.body({ type: "text" }).value;
    const request = new Request("http://api.feieyun.cn/Api/Open/", {
        method: "POST",
        body: body,
    });
    const resp = await fetch(request);
    const ret = await resp.text();
    ctx.response.body = ret;
});

const feieUrl = "http://api.feieyun.cn/Api/Open/";
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", (e) =>
    console.log("Listening on http://localhost:8000")
);
await app.listen({ port: 8000 });
