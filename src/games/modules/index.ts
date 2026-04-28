import { ashtaChammaModule } from "./ashta-chamma";
import { damrooModule } from "./damroo";
import { gilliDandaModule } from "./gilli-danda";
import { mokshaPatamModule } from "./moksha-patam";
import { pallankuzhiModule } from "./pallankuzhi";
import { rajaMantriModule } from "./raja-mantri";

export const gameModules = {
  "raja-mantri-chor-sipahi": rajaMantriModule,
  "ashta-chamma": ashtaChammaModule,
  damroo: damrooModule,
  "moksha-patam": mokshaPatamModule,
  pallankuzhi: pallankuzhiModule,
  "gilli-danda": gilliDandaModule
};

export type GameModuleSlug = keyof typeof gameModules;

export function getGameModule(slug: string) {
  return gameModules[slug as GameModuleSlug];
}
