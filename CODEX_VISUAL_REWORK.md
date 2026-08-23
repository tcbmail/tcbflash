# TCBFlash Visual Rework Directive

## Status

This directive supersedes the visual interpretation in the current PR implementation while preserving useful verified biography/content work.

The current result is rejected on visual grounds.

Do **not** polish the current beige editorial treatment. Do **not** merely tweak colors, type sizes, or rules. Recompose the page around photography and visual storytelling.

## Why the current implementation failed

The current implementation treated the photo-free fallback as the product. That was the wrong decision. The biography became a long text document on a warm-paper surface, dominated by large serif type, ruled sections, a career ledger, and repeated text blocks. It reads like a designed résumé or literary annual report rather than a living personal site.

The user explicitly dislikes the result.

The photo archive was emotionally difficult for Ben to assemble. Real photographs are now committed to this branch and are mandatory design material, not optional decoration.

## Hard requirement: use the real photographs

The branch now contains:

- `public/assets/photos/ben-hero.webp`
  - Current Ben standing beside a red Mercedes.
  - Use this prominently in the opening viewport or immediately adjacent to it.
  - It is the primary human anchor for the page.

- `public/assets/photos/ben-archive-grid.webp`
  - Curated six-image documentary strip assembled from Ben's archive.
  - It includes a 2008 computer/workstation image, The Waverly sign, salvage/yard imagery, Junkyarder fulfillment imagery, and 2024 hands-on mechanical work.
  - Use this visibly as a major visual passage, not as a tiny thumbnail.

These are web-optimized derivatives. Do not complain about source-photo availability and do not replace them with generated, stock, or placeholder images.

Image quality is intentionally documentary rather than studio-perfect. Design around that reality. Imperfect personal photographs are part of the credibility of the site.

## New visual direction

Think **modern documentary profile / digital magazine / founder portrait**, not résumé, SaaS landing page, corporate agency, or retro newspaper.

The visual design should feel contemporary, confident, restrained, and human.

Preferred attributes:

- Photo-led.
- Dark or deep neutral base is preferred because it lets mixed-quality archival photography feel cohesive and intentional.
- Crisp modern sans/grotesk typography for the primary system. A restrained secondary serif can be used sparingly if it genuinely improves the composition, but Georgia-dominant literary styling is rejected.
- Large negative space.
- Strong typographic hierarchy without gigantic novelty type consuming the screen.
- Editorial asymmetry where useful.
- Photographs can break grids or occupy large fields.
- Subtle motion only if it adds polish and respects reduced-motion settings.
- Minimal borders/rules. Do not structure every section as a ruled ledger.
- Use short chapter labels and concise supporting copy rather than presenting all biography at equal visual weight.
- The page should feel expensive without looking like a venture-backed SaaS template.

Avoid:

- beige/warm-paper as the dominant canvas;
- faux newspaper/document styling;
- giant Georgia/Times headlines;
- career-ledger hero panels;
- endless ruled rows;
- generic cards everywhere;
- gradients associated with AI/SaaS marketing;
- glowing circuit imagery, robots, brain icons, fake terminal/hacker aesthetics;
- generated portraits;
- stock photography;
- prestige-title peacocking.

## Narrative hierarchy

The existing long-form biography can remain as source material, but the visible page needs stronger editing and pacing.

A visitor should understand the story in roughly this order:

1. **Benjamin Hornung**
   - Human first.
   - No need for a title stack.
   - A short line about building systems across different media is appropriate.
   - Pair with the real hero photograph.

2. **The through-line**
   - Computers first, then physical-world businesses, then back to computing through AI.
   - Make this understandable in a few screens, not only after reading thousands of words.

3. **Early computing**
   - Rave Studios / London / Iowa Energy Center / Citrix.
   - The point is curiosity, systems thinking, technical work, then disillusionment with repetitive corporate machinery.
   - Use the 2008 computer image from the archive grid as a visual echo that computers never completely disappeared.

4. **The physical-world years**
   - Property, construction, Waverly, cars, salvage, e-commerce.
   - This is not an embarrassing detour and should not be visually subordinated.
   - The Waverly, Junkyarder, salvage, and mechanical archive images are evidence.

5. **Return to computing**
   - AI made computing interesting enough to pull Ben back.
   - FlashForce is the current culmination: decades of systems thinking plus firsthand operating experience.
   - Do not turn this into a duplicate FlashForce marketing page.

6. **Selected work / artifacts**
   - FlashForce prominently.
   - Fishbrain, AidineLine, earlier ventures, and development work can appear selectively.
   - No need to make every project a giant card.

7. **Timeline / education**
   - Keep for visitors who want detail.
   - Visually subordinate to the story, perhaps an expandable or compact lower-page section.
   - Do not lead with a résumé table.

8. **Beautiful Bullshit / writing**
   - A distinct, slightly sharper visual break.
   - It is Ben's essays / observations, not generic content marketing.

9. **Contact**
   - `info@tcbflash.com`
   - Simple and direct.

## Copy treatment

The biography/content work in the existing implementation is useful. Preserve factual accuracy, but edit the on-screen experience.

Rules:

- Shorten repetitive passages.
- Use selected pull quotes and chapter intros.
- Keep the deeper chronology lower on the page for people who want to stalk properly.
- Do not invent quotes or make Ben sound like a motivational speaker.
- Ben's tone can be intelligent, candid, lightly irreverent, and self-aware.
- Avoid consultant language such as `solutions`, `transformation`, `thought leadership`, `visionary`, `disruptor`, or `serial entrepreneur` as identity padding.
- Ben does not care about titles.

## Photo use and captions

Use neutral, supportable captions only. Suggested captions for the curated grid's source images, if individual source context is needed in accompanying text:

- `2008 — computers never really left.`
- `The Waverly, Bay St. Louis, Mississippi.`
- `2019 — salvage work.`
- `Junkyarder fulfillment, 2023.`
- `2024 — still happier with a system to understand.`

Do not identify ambiguous properties or people. Do not invent dates beyond supplied context.

## Privacy and factual constraints

All privacy restrictions from `CODEX_REBUILD_BRIEF.md` remain hard requirements.

Especially:

- No children's names/details/photos.
- No intimate medical history.
- No addiction history.
- No suicidal history.
- No divorce details.
- No active legal disputes.
- No unverified accusations or negative stories naming third parties.
- No home address.
- No invented achievements, certifications, metrics, client claims, or valuations.

Ben prefers few hard numbers. Known safe project sizes from the brief may be used sparingly, but the design should not rely on metrics as credibility theater.

## Technical direction

Keep the implementation simple and static-first unless the design clearly benefits from existing tooling.

Requirements:

- The two committed real image assets must render in the production build.
- Responsive layouts must keep photographs visually meaningful on mobile rather than hiding them.
- Use proper `width`/`height` or aspect-ratio handling to prevent layout shifts.
- Meaningful alt text; decorative treatment only when genuinely decorative.
- Optimize loading. The hero may load eagerly; archive imagery should not block first paint unnecessarily.
- Keep current relative-path portability fix working.
- Preserve useful SEO / OpenGraph metadata, but update theme/preview metadata to match the new visual direction.
- No horizontal overflow.
- Keyboard/focus/reduced-motion/accessibility basics must remain sound.

## Required visual QA

Do not declare this finished from lint/build alone.

Before reporting completion:

1. Run the production build.
2. Open the production result in an actual browser.
3. Capture or inspect desktop and narrow/mobile views.
4. Verify both committed photo assets visibly render.
5. Verify the first viewport looks intentional and human, not like a résumé or styled document.
6. Verify there is meaningful visual variation down the page.
7. Verify the biography does not become an uninterrupted wall of text.
8. Check console errors and horizontal overflow.

If browser verification shows the site still resembles the rejected warm-paper/ledger design, continue working. A technically correct version of the rejected composition is still rejected.

## Completion standard

This is a corrective visual pass, not a theoretical exercise.

A successful result should make someone who met Ben click the site and immediately feel:

- this is a real person;
- he has actually built and operated strange, varied things;
- the life story has a coherent through-line;
- the current AI work came from that history rather than appearing overnight;
- there is more here if they want to keep digging.

Good beats perfect. But it must be visually compelling enough that photography and story, not CSS cleverness, are doing the work.
