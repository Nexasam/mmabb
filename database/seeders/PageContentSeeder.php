<?php

namespace Database\Seeders;

use App\Models\PageContent;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // ── Hero ──────────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'hero.headline',   'label' => 'Hero — Headline',         'type' => 'text',     'value' => "Specialist Care\nAt Home"],
            ['page' => 'home', 'key' => 'hero.subtext',    'label' => 'Hero — Subtext',           'type' => 'textarea', 'value' => 'MMAB Home Care is a CQC-rated Good, nurse-led provider serving North and South East England. We deliver complex clinical care, learning disability and autism support, mental health care, and domiciliary services — so people can live well in the comfort of their own homes.'],
            ['page' => 'home', 'key' => 'hero.cta_label',  'label' => 'Hero — CTA Button Label', 'type' => 'text',     'value' => 'Enquire About Care'],
            ['page' => 'home', 'key' => 'hero.cta_href',   'label' => 'Hero — CTA Button Link',  'type' => 'text',     'value' => '/contact'],
            ['page' => 'home', 'key' => 'hero.youtube_id', 'label' => 'Hero — YouTube Video ID', 'type' => 'text',     'value' => 'dQw4w9WgXcQ'],

            // ── Stats bar ─────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'stats', 'label' => 'Stats Bar (JSON array)', 'type' => 'json', 'value' => json_encode([
                ['value' => 'Good',       'label' => 'CQC Rating'],
                ['value' => 'Nurse-Led',  'label' => 'Clinical Leadership'],
                ['value' => '30+',        'label' => 'Years Experience'],
                ['value' => 'NE England', 'label' => 'Coverage Area'],
            ])],

            // ── Services section ──────────────────────────────────────────────
            ['page' => 'home', 'key' => 'services.badge',    'label' => 'Services — Badge Text',   'type' => 'text',     'value' => 'Our Care Services'],
            ['page' => 'home', 'key' => 'services.headline', 'label' => 'Services — Headline',     'type' => 'text',     'value' => 'Specialist care at home, for every need'],
            ['page' => 'home', 'key' => 'services.subtext',  'label' => 'Services — Subtext',      'type' => 'textarea', 'value' => 'We provide high-quality, nurse-led care to adults and young people across North and South East England — enabling people to live safely and independently in their own homes.'],
            ['page' => 'home', 'key' => 'services.items',    'label' => 'Services — Cards (JSON)', 'type' => 'json',     'value' => json_encode([
                ['icon' => 'HeartPulse',  'title' => 'Complex Clinical Care',          'description' => 'Nurse-led care at home for adults and children with neurological conditions, brain injury, spinal injury, tracheostomy, airway management, PEG feeding, and other complex health needs — enabling people to live safely in their own homes.',  'href' => '/contact'],
                ['icon' => 'Brain',       'title' => 'Learning Disabilities & Autism', 'description' => 'Personalised support for adults and young people with learning disabilities and autism, helping them build confidence, develop life skills, and live independently within their communities.',                                               'href' => '/contact'],
                ['icon' => 'Heart',       'title' => 'Mental Health Support',          'description' => 'Compassionate, condition-specific care for people living with mental health conditions — personalised plans focused on emotional wellbeing, stability, and recovery in familiar surroundings.',                                              'href' => '/contact'],
                ['icon' => 'Users',       'title' => 'Domiciliary Care',               'description' => 'Flexible, person-centred support with daily living — personal care, meal preparation, mobility, household tasks, and community access — built around each person\'s own routines and preferences.',                                         'href' => '/contact'],
                ['icon' => 'HeartPulse',  'title' => 'Respite & End of Life Care',     'description' => 'Short-term respite to give family carers a well-earned break, and compassionate end of life care that prioritises dignity, comfort, and choice in the place people call home.',                                                              'href' => '/contact'],
                ['icon' => 'ShieldCheck', 'title' => 'Commissioner Partnerships',      'description' => 'We work closely with ICBs, NHS teams, and local authorities across North and South East England — accepting new packages quickly, with full nurse-led clinical oversight.',                                                                  'href' => '/contact'],
            ])],

            // ── Why Choose Us ─────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'why.headline', 'label' => 'Why Choose Us — Headline',      'type' => 'text',     'value' => 'Why families and commissioners choose MMAB'],
            ['page' => 'home', 'key' => 'why.subtext',  'label' => 'Why Choose Us — Subtext',       'type' => 'textarea', 'value' => 'CQC-rated Good and nurse-led, we bring clinical depth, genuine compassion, and a commitment to getting care right for every person we support. Our recent CQC report noted: "Management led by example, with a strong focus on values and staff support."'],
            ['page' => 'home', 'key' => 'why.points',   'label' => 'Why Choose Us — Points (JSON)', 'type' => 'json',     'value' => json_encode([
                ['title' => 'CQC Rated Good',           'description' => 'Our CQC rating reflects a genuine commitment to safe, effective, and person-centred care — not just on inspection day, but every day.'],
                ['title' => 'Nurse-Led',                'description' => 'All care is overseen by experienced nurses. That clinical rigour means better outcomes and safer care for the people we support.'],
                ['title' => 'Complex Care Specialists', 'description' => 'We support people with the most complex needs at home — tracheostomy, ventilation, brain injury, neurological conditions — so they can stay in their family and community.'],
                ['title' => 'Person-Centred Always',    'description' => 'Every care plan is shaped by the individual — what they want, what matters to them, and how they want to live their life.'],
                ['title' => 'We Move Quickly',          'description' => "When someone needs care, waiting isn't an option. We work quickly to have safe, high-quality care in place — often within 72 hours of referral."],
                ['title' => 'Values-Driven',            'description' => '"Management led by example, with a strong focus on values and staff support." — CQC Inspection Report.'],
            ])],

            // ── Testimonials ──────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'testimonials.headline', 'label' => 'Testimonials — Headline',     'type' => 'text', 'value' => 'What commissioners and families say'],
            ['page' => 'home', 'key' => 'testimonials.items',    'label' => 'Testimonials — Items (JSON)', 'type' => 'json', 'value' => json_encode([
                ['quote' => 'MMAB stepped in at short notice to support one of our most complex packages. The nurse-led team were professional throughout and the family felt truly supported from day one.', 'name' => 'NHS Complex Care Manager', 'role' => 'Integrated Care Board', 'rating' => 5],
                ['quote' => 'The clinical knowledge of the MMAB team is outstanding. They manage tracheostomy and ventilator care at home to a standard I rarely see from independent providers. I have no hesitation referring packages to them.', 'name' => 'Community Nursing Lead', 'role' => 'NHS Trust', 'rating' => 5],
                ['quote' => 'Having MMAB support our family member at home has made an enormous difference. The carers are skilled, consistent, and genuinely caring. We finally feel like we can breathe.', 'name' => 'Family Carer', 'role' => 'North East England', 'rating' => 5],
            ])],

            // ── Video section ─────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'video.title',    'label' => 'Video Section — Title',    'type' => 'text',     'value' => 'Care that makes a real difference'],
            ['page' => 'home', 'key' => 'video.subtitle', 'label' => 'Video Section — Subtitle', 'type' => 'textarea', 'value' => 'See how MMAB Home Care supports adults and young people to live safely and independently in North and South East England.'],

            // ── Case studies ──────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'cases.headline', 'label' => 'Case Studies — Headline',     'type' => 'text', 'value' => 'Real people. Real outcomes.'],
            ['page' => 'home', 'key' => 'cases.items',    'label' => 'Case Studies — Items (JSON)', 'type' => 'json', 'value' => json_encode([
                ['tag' => 'Complex Clinical Care', 'title' => 'Safe home discharge for a young adult requiring ventilation',       'story' => 'An ICB referred a young adult with complex respiratory needs following a prolonged hospital admission. Our nurse-led team established a safe home care package within 72 hours, enabling discharge and allowing the individual to return to family life.',  'outcome' => 'Home discharge achieved within 72 hours'],
                ['tag' => 'Learning Disability',   'title' => 'Supporting a young person with autism through a complex transition', 'story' => 'A local authority commissioned MMAB to support a young person with autism and complex behaviours through a transition from residential care. Our team provided consistent, person-centred support, resulting in a stable home placement and improved wellbeing.', 'outcome' => 'Stable home placement maintained'],
                ['tag' => 'Domiciliary Care',      'title' => 'Enabling independence for an adult with neurological needs',         'story' => 'Following a brain injury, a middle-aged adult required daily support to live at home rather than in a residential setting. MMAB built a flexible care package around their goals — supporting independence, community access, and quality of life.',           'outcome' => 'Residential placement avoided'],
            ])],

            // ── About block ───────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'about.headline', 'label' => 'About Block — Headline',     'type' => 'text',     'value' => 'Trusted care, close to home.'],
            ['page' => 'home', 'key' => 'about.body1',    'label' => 'About Block — Paragraph 1',  'type' => 'textarea', 'value' => 'MMAB Home Care is a nurse-led provider rated Good by the CQC, serving North and South East England. We support adults and young people with complex clinical needs, learning disabilities, autism, mental health conditions, and everyday care needs — so they can live well in the place they call home.'],
            ['page' => 'home', 'key' => 'about.body2',    'label' => 'About Block — Paragraph 2',  'type' => 'textarea', 'value' => 'Led by Rosemary Lanlehin — a registered nurse with over 30 years of clinical and academic experience — our team brings exceptional depth to every care package. We work closely with ICBs, NHS teams, and local authorities, and we are currently accepting new packages.'],
            ['page' => 'home', 'key' => 'about.stats',    'label' => 'About Block — Stats (JSON)', 'type' => 'json',     'value' => json_encode([
                ['value' => 'Good',       'label' => 'CQC Rating'],
                ['value' => 'Nurse-Led',  'label' => 'Clinical Leadership'],
                ['value' => '30+',        'label' => 'Years Experience'],
                ['value' => 'NE England', 'label' => 'Coverage Area'],
            ])],

            // ── CTA banner ────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'cta.headline', 'label' => 'CTA Banner — Headline', 'type' => 'text',     'value' => 'Currently accepting new care packages'],
            ['page' => 'home', 'key' => 'cta.subtext',  'label' => 'CTA Banner — Subtext',  'type' => 'textarea', 'value' => 'We are keen to support your team or your family with flexible, nurse-led care. Get in touch to discuss a referral — we respond within 24 hours.'],

            // ── Contact form section ──────────────────────────────────────────
            ['page' => 'home', 'key' => 'contact.headline', 'label' => 'Contact Form — Headline', 'type' => 'text',     'value' => 'Talk to us about care'],
            ['page' => 'home', 'key' => 'contact.subtext',  'label' => 'Contact Form — Subtext',  'type' => 'textarea', 'value' => "Whether you're a commissioner, ICB, local authority, or a family looking for specialist care at home — we're here to help. Fill in the form and we'll be in touch within 24 hours."],

            // ── Global / site-wide ────────────────────────────────────────────
            ['page' => 'global', 'key' => 'site.phone',    'label' => 'Phone Number',  'type' => 'text', 'value' => '0191 380 4370'],
            ['page' => 'global', 'key' => 'site.email',    'label' => 'Email Address', 'type' => 'text', 'value' => 'info@mmabconsulting.com'],
            ['page' => 'global', 'key' => 'site.address',  'label' => 'Address',       'type' => 'text', 'value' => 'Meadowfield, Durham'],
            ['page' => 'global', 'key' => 'site.coverage', 'label' => 'Coverage Area', 'type' => 'text', 'value' => 'North & South East England'],
            ['page' => 'global', 'key' => 'site.tagline',  'label' => 'Site Tagline',  'type' => 'text', 'value' => 'We Care'],
        ];

        foreach ($items as $item) {
            PageContent::updateOrCreate(
                ['key' => $item['key']],
                $item,
            );
        }

        $this->command->info('✓ Page content seeded ('.count($items).' items).');
    }
}
