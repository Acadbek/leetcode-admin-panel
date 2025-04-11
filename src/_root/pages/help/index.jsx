import { ContactSupport } from "./contact-support";
import { DetailedHelp } from "./detailed-help";
import { HelpCategories } from "./help-categories";
import { SearchSection } from "./search-section";

export default function HelpPage() {
  return (
    <div className="px-4">
      <div>
        <SearchSection />
        <HelpCategories />
        <DetailedHelp />
        <ContactSupport />
      </div>
    </div>
  )
}
