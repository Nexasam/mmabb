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
            ['page' => 'home', 'key' => 'hero.headline',    'label' => 'Hero — Headline',        'type' => 'text',     'value' => "Specialist Care\nFor Every Need"],
            ['page' => 'home', 'key' => 'hero.subtext',     'label' => 'Hero — Subtext',          'type' => 'textarea', 'value' => 'MMAB Home Care is a CQC-rated GOOD, nurse-led provider serving North and South East England. We deliver complex clinical care, mental health and LD support, and domiciliary care to adults and young people in the comfort of their own homes. We work in partnership with ICBs, NHS teams, and local authorities.'],
            ['page' => 'home', 'key' => 'hero.cta_label',   'label' => 'Hero — CTA Button Label', 'type' => 'text',     'value' => 'Refer a package'],
            ['page' => 'home', 'key' => 'hero.cta_href',    'label' => 'Hero — CTA Button Link',  'type' => 'text',     'value' => '/contact'],
            ['page' => 'home', 'key' => 'hero.youtube_id',  'label' => 'Hero — YouTube Video ID', 'type' => 'text',     'value' => 'dQw4w9WgXcQ'],

            // ── Stats bar ─────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'stats', 'label' => 'Stats Bar (JSON array)', 'type' => 'json', 'value' => json_encode([
                ['value' => 'GOOD',      'label' => 'CQC Rating'],
                ['value' => 'Nurse-Led', 'label' => 'Clinical Leadership'],
                ['value' => 'CPD',       'label' => 'Accredited Training'],
                ['value' => 'NE England', 'label' => 'North & South East'],
            ])],

            // ── Services section ──────────────────────────────────────────────
            ['page' => 'home', 'key' => 'services.badge',    'label' => 'Services — Badge Text',    'type' => 'text',     'value' => 'What We Provide'],
            ['page' => 'home', 'key' => 'services.headline', 'label' => 'Services — Headline',      'type' => 'text',     'value' => 'Comprehensive nurse-led care across every need'],
            ['page' => 'home', 'key' => 'services.subtext',  'label' => 'Services — Subtext',       'type' => 'textarea', 'value' => 'From complex clinical care at home to mental health support and CPD-accredited training, we deliver flexible, high-quality services to individuals, families, and healthcare organisations.'],
            ['page' => 'home', 'key' => 'services.items',    'label' => 'Services — Cards (JSON)',  'type' => 'json',     'value' => json_encode([
                ['icon' => 'HeartPulse',    'title' => 'Complex & Clinical Care',    'description' => 'Nurse-led care packages for adults and children with neurological conditions, brain injury, spinal injury, tracheostomy, airway management, PEG feeding, stoma and catheter care — enabling individuals to remain safely at home.',                          'href' => '/contact'],
                ['icon' => 'Brain',         'title' => 'Mental Health & LD Support', 'description' => 'Supporting adults and young people to live independently within their communities. We provide personalised plans to promote emotional wellbeing, with staff trained in condition-specific care for mental health, learning disabilities, and autism.',        'href' => '/contact'],
                ['icon' => 'Users',         'title' => 'Domiciliary & Respite Care', 'description' => 'Flexible, person-centred care at home including personal care, meal preparation, mobility, household tasks, and community access. Available as ongoing support or short-term respite to relieve family carers.',                                          'href' => '/contact'],
                ['icon' => 'Stethoscope',   'title' => 'Clinical Training',          'description' => 'CPD-accredited training delivered by an experienced clinical educator, including staff competency assessments for delegated nursing tasks — supporting safe, compliant care delivery.',                                                                    'href' => '/courses'],
                ['icon' => 'ClipboardList', 'title' => 'Business Consultancy',       'description' => 'Regulatory compliance audits, CQC inspection preparation, staff consultation support, and other operational services to help care providers improve quality and meet regulatory requirements.',                                                            'href' => '/contact'],
                ['icon' => 'ShieldCheck',   'title' => 'ICB & NHS Partnerships',     'description' => 'We work directly with ICBs, NHS teams, and local authorities across North and South East England to accept new packages quickly, with nurse-led oversight and a strong focus on safety and person-centred outcomes.',                                     'href' => '/contact'],
            ])],

            // ── Why Choose Us ─────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'why.headline', 'label' => 'Why Choose Us — Headline', 'type' => 'text',     'value' => 'The MMAB Home Care Difference'],
            ['page' => 'home', 'key' => 'why.subtext',  'label' => 'Why Choose Us — Subtext',  'type' => 'textarea', 'value' => 'We are a CQC-rated GOOD, nurse-led provider with deep expertise in complex and clinical care. Our Operations Director brings a wide range of industry experience, and our CQC report noted: "Management led by example, with a strong focus on values and staff support."'],
            ['page' => 'home', 'key' => 'why.points',   'label' => 'Why Choose Us — Points (JSON)', 'type' => 'json', 'value' => json_encode([
                ['title' => 'CQC-Rated GOOD',            'description' => 'Our most recent CQC inspection rated us GOOD, reflecting our commitment to safe, effective, and person-centred care.'],
                ['title' => 'Nurse-Led',                  'description' => 'All our services are clinically led by experienced nurses, ensuring the highest standards of care and oversight.'],
                ['title' => 'Complex Care Specialists',   'description' => 'We are leaders in complex and clinical home care, supporting service users with the most challenging and high-acuity needs.'],
                ['title' => 'CPD-Accredited Training',    'description' => 'Our training arm delivers CPD-accredited programmes and educational support to healthcare professionals and organisations.'],
                ['title' => 'Flexible Packages',          'description' => 'We accept new packages quickly and can tailor services to the needs of ICBs, NHS teams, local authorities, and individual families.'],
                ['title' => 'Values-Driven Leadership',   'description' => 'Our management team leads by example with a strong focus on values, staff support, and continuous improvement.'],
            ])],

            // ── Testimonials ──────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'testimonials.headline', 'label' => 'Testimonials — Headline', 'type' => 'text', 'value' => 'What commissioners and families say'],
            ['page' => 'home', 'key' => 'testimonials.items',    'label' => 'Testimonials — Items (JSON)', 'type' => 'json', 'value' => json_encode([
                ['quote' => 'MMAB Home Care stepped in at short notice to support one of our most complex packages. The nurse-led team handled everything professionally and the family felt genuinely supported throughout.', 'name' => 'NHS Complex Care Manager', 'role' => 'Integrated Care Board', 'rating' => 5],
                ['quote' => 'The clinical knowledge of the MMAB team is outstanding. They manage tracheostomy and ventilator care at home to a standard I rarely see from independent providers. I have no hesitation referring packages to them.', 'name' => 'Community Nursing Lead', 'role' => 'NHS Trust', 'rating' => 5],
                ['quote' => 'The CPD training we received from MMAB transformed how our team approaches complex care. It was practical, clinically rigorous, and immediately applicable to our day-to-day work.', 'name' => 'Registered Manager', 'role' => 'Independent Care Provider', 'rating' => 5],
            ])],

            // ── Video section ─────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'video.title',    'label' => 'Video Section — Title',    'type' => 'text',     'value' => 'See how we make a difference'],
            ['page' => 'home', 'key' => 'video.subtitle', 'label' => 'Video Section — Subtitle', 'type' => 'textarea', 'value' => 'Watch how MMAB Home Care is delivering outstanding nurse-led care and training across the UK.'],

            // ── Case studies ──────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'cases.headline', 'label' => 'Case Studies — Headline', 'type' => 'text', 'value' => "How we've supported commissioners and families"],
            ['page' => 'home', 'key' => 'cases.items',    'label' => 'Case Studies — Items (JSON)', 'type' => 'json', 'value' => json_encode([
                ['tag' => 'Complex Care',            'title' => 'Home ventilation and tracheostomy care for a young adult',     'story' => 'An ICB referred a young adult with complex respiratory needs following a prolonged hospital admission. Our nurse-led team established a safe care package within 72 hours, enabling discharge and supporting the individual to return to their family home.',        'outcome' => 'Successful discharge within 72 hours'],
                ['tag' => 'Mental Health & LD',      'title' => 'Supporting transition for a young person with autism',        'story' => 'A local authority commissioned MMAB to support a young person with autism and complex behaviours through a transition from residential care. Our team delivered person-centred community support, resulting in a stable placement and improved wellbeing.',    'outcome' => 'Stable community placement achieved'],
                ['tag' => 'Clinical Training',       'title' => 'Upskilling a care team in complex clinical procedures',       'story' => 'An independent provider commissioned bespoke CPD-accredited training for their staff covering enteral feeding, seizure management, and respiratory care. Post-training assessment confirmed significant improvements in clinical competency across the team.',  'outcome' => 'Measurable competency improvement'],
            ])],

            // ── About block ───────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'about.headline', 'label' => 'About Block — Headline', 'type' => 'text',     'value' => 'CQC-rated GOOD. Nurse-led. Person-centred.'],
            ['page' => 'home', 'key' => 'about.body1',    'label' => 'About Block — Paragraph 1', 'type' => 'textarea', 'value' => 'MMAB Home Care is a nurse-led provider rated GOOD by the CQC, serving North and South East England. We specialise in complex and clinical care for adults and young people, as well as mental health, learning disability, and autism support — all delivered in the home and community setting.'],
            ['page' => 'home', 'key' => 'about.body2',    'label' => 'About Block — Paragraph 2', 'type' => 'textarea', 'value' => 'Led by Rosemary Lanlehin, a nurse with over 30 years of clinical, academic, and complex care experience — including 20 years as Programme Director at City University London — our team brings exceptional clinical depth to everything we do. We work in close partnership with ICBs, NHS trusts, and local authorities, and deliver CPD-accredited clinical training and business consultancy.'],
            ['page' => 'home', 'key' => 'about.stats',    'label' => 'About Block — Stats (JSON)', 'type' => 'json', 'value' => json_encode([
                ['value' => 'GOOD',    'label' => 'CQC Rating'],
                ['value' => 'Nurse-Led', 'label' => 'Clinical Leadership'],
                ['value' => 'UK-Wide', 'label' => 'Nationwide Delivery'],
                ['value' => 'CPD',     'label' => 'Accredited Training'],
            ])],

            // ── CTA banner ────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'cta.headline', 'label' => 'CTA Banner — Headline', 'type' => 'text',     'value' => 'Currently accepting new packages'],
            ['page' => 'home', 'key' => 'cta.subtext',  'label' => 'CTA Banner — Subtext',  'type' => 'textarea', 'value' => 'We are keen to support your team with flexible, nurse-led care solutions. Get in touch today to discuss a new package or to find out more about our services.'],

            // ── Contact form section ──────────────────────────────────────────
            ['page' => 'home', 'key' => 'contact.headline', 'label' => 'Contact Form — Headline', 'type' => 'text',     'value' => 'Refer a package or get in touch'],
            ['page' => 'home', 'key' => 'contact.subtext',  'label' => 'Contact Form — Subtext',  'type' => 'textarea', 'value' => "Whether you're a commissioner, ICB, local authority, or a family looking for specialist care, we're here to help. Fill in the form and we'll be in touch within 24 hours."],

            // ── Global / site-wide ────────────────────────────────────────────
            ['page' => 'global', 'key' => 'site.phone',    'label' => 'Phone Number',   'type' => 'text', 'value' => '0191 380 4370'],
            ['page' => 'global', 'key' => 'site.email',    'label' => 'Email Address',  'type' => 'text', 'value' => 'info@mmabconsulting.com'],
            ['page' => 'global', 'key' => 'site.address',  'label' => 'Address',        'type' => 'text', 'value' => 'Meadowfield, Durham'],
            ['page' => 'global', 'key' => 'site.coverage', 'label' => 'Coverage Area',  'type' => 'text', 'value' => 'North & South East England'],
            ['page' => 'global', 'key' => 'site.tagline',  'label' => 'Site Tagline',   'type' => 'text', 'value' => 'We Care'],
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
