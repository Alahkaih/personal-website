import { SSTConfig } from "sst";
import { NextjsSite, StackContext } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "personal-website",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }: StackContext) {
      const site = new NextjsSite(stack, "site", {
        customDomain: "alahkaih.com"
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
