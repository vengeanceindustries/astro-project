import {
	getBannerConfigFromHost,
	getBannerDomain,
} from "@utils/banner.configs";
import { defineMiddleware, sequence } from "astro:middleware";

const bannerDetection = defineMiddleware(async (context, next) => {
	const cookie = context.cookies.get("FL_BANNER_ID")?.value;
	console.log("bannerDetection request", { cookie });

	const bannerObj = getBannerConfigFromHost(context.url.hostname);
	const banner = bannerObj.siteId; // getBannerFromHost(context.url.hostname);
	context.cookies.set("FL_BANNER_ID", banner);

	const headers = context.request.headers;
	const bannerDomain = getBannerDomain(context.cookies);
	// context.url.host = bannerDomain; // `www.${bannerObj.host}`;

	const href = context.url.href;
	console.log("middleware", {
		bannerDomain,
		bannerObj,
		// cookies: headers.get('cookies'),
		href,
		// "accept-language": headers.get("accept-language"),
		// "user-agent": headers.get("user-agent"),
		// currentLocale: context.currentLocale,
		// locals: context.locals, // integrations, eg netlify
		// params: context.params,
		// props: context.props,
		// preferredLocale: context.preferredLocale,
		// preferredLocaleList: context.preferredLocaleList,
		// redirect: context.redirect, // func
		// request: context.request,
		// rewrite: context.rewrite, // func
		// site: context.site,
		// url: context.url,
	});

	console.log("bannerDetection response", { banner });
	return next();
});

const validation = defineMiddleware(async (context, next) => {
	console.log("validation request");
	const response = await next();
	console.log("validation response");
	return response;
});

const auth = defineMiddleware(async (context, next) => {
	console.log("auth request");
	const response = await next();
	console.log("context", {
		// request: context.request,
		// href: context.url.href,
		hostname: context.url.hostname,
		// url: context.url,
	});
	context.locals.title = "New title";
	console.log("auth response");
	return response;
});

const greeting = defineMiddleware(async (_context, next) => {
	console.log("greeting request");
	const response = await next();
	console.log("greeting response");
	return response;
});

const sanitize = defineMiddleware(async (_context, next) => {
	console.log("sanitize request");
	const response = await next();
	const html = await response.text();
	const redactedHtml = html.replaceAll(
		"PRIVATE INFO",
		"<strike>REDACTED</strike>"
	);
	console.log("sanitize response");
	return new Response(redactedHtml, {
		status: 200,
		headers: response.headers,
	});
});

// export const onRequest = sequence(validation, auth, sanitize);
export const onRequest = sequence(bannerDetection, sanitize);
