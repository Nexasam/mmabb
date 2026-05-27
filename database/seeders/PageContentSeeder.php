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
            ['page' => 'home', 'key' => 'hero.headline',    'label' => 'Hero — Headline',        'type' => 'text',     'value' => "Specialist Care\nAnd Support"],
            ['page' => 'home', 'key' => 'hero.subtext',     'label' => 'Hero — Subtext',          'type' => 'textarea', 'value' => 'With over 10 years of experience, we provide specialist clinical training to healthcare professionals supporting children and young people with complex care needs, learning disabilities, and neurological conditions across the UK.'],
            ['page' => 'home', 'key' => 'hero.cta_label',   'label' => 'Hero — CTA Button Label', 'type' => 'text',     'value' => 'Find out more'],
            ['page' => 'home', 'key' => 'hero.cta_href',    'label' => 'Hero — CTA Button Link',  'type' => 'text',     'value' => '/courses'],
            ['page' => 'home', 'key' => 'hero.youtube_id',  'label' => 'Hero — YouTube Video ID', 'type' => 'text',     'value' => 'dQw4w9WgXcQ'],

            // ── Stats bar ─────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'stats', 'label' => 'Stats Bar (JSON array)', 'type' => 'json', 'value' => json_encode([
                ['value' => '500+',    'label' => 'Professionals Trained'],
                ['value' => '3-Day',   'label' => 'Intensive Programme'],
                ['value' => '21 hrs',  'label' => 'CPD Accredited'],
                ['value' => 'UK-Wide', 'label' => 'Delivery'],
            ])],

            // ── Services section ──────────────────────────────────────────────
            ['page' => 'home', 'key' => 'services.badge',    'label' => 'Services — Badge Text',    'type' => 'text',     'value' => 'What We Cover'],
            ['page' => 'home', 'key' => 'services.headline', 'label' => 'Services — Headline',      'type' => 'text',     'value' => 'Specialist training across all areas of complex care'],
            ['page' => 'home', 'key' => 'services.subtext',  'label' => 'Services — Subtext',       'type' => 'textarea', 'value' => 'Our programmes cover the full spectrum of paediatric complex care, from clinical skills to safeguarding and family-centred practice.'],
            ['page' => 'home', 'key' => 'services.items',    'label' => 'Services — Cards (JSON)',  'type' => 'json',     'value' => json_encode([
                ['title' => 'Paediatric Complex Care',  'description' => 'Specialist training for professionals supporting children with complex, long-term health conditions requiring nurse-led, multi-disciplinary care.',          'href' => '/courses/paediatric-complex-care-3-day'],
                ['title' => 'Neurological Conditions',  'description' => 'Comprehensive modules covering acquired brain injury, epilepsy management, and neurological assessment in paediatric settings.',                           'href' => '/courses'],
                ['title' => 'Respiratory & Airway',     'description' => 'Hands-on training in tracheostomy care, ventilator management, and emergency airway protocols for complex care environments.',                            'href' => '/courses'],
                ['title' => 'Enteral Feeding',          'description' => 'Evidence-based training in NG, NJ, and gastrostomy management, including troubleshooting and family education.',                                          'href' => '/courses'],
                ['title' => 'Family-Centred Care',      'description' => 'Developing skills to work in genuine partnership with families, carers, and multidisciplinary teams around the child.',                                   'href' => '/courses'],
                ['title' => 'Safeguarding',             'description' => 'Recognising and responding to safeguarding concerns specific to children with complex health needs and disabilities.',                                    'href' => '/courses'],
            ])],

            // ── Why Choose Us ─────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'why.headline', 'label' => 'Why Choose Us — Headline', 'type' => 'text',     'value' => 'The MMAB Consulting Difference'],
            ['page' => 'home', 'key' => 'why.subtext',  'label' => 'Why Choose Us — Subtext',  'type' => 'textarea', 'value' => 'We are a specialist healthcare training consultancy with a single focus: equipping professionals to deliver outstanding care to children with complex needs. Every aspect of our programmes reflects that commitment.'],
            ['page' => 'home', 'key' => 'why.points',   'label' => 'Why Choose Us — Points (JSON)', 'type' => 'json', 'value' => json_encode([
                ['title' => 'Nurse-Led Curriculum',    'description' => 'Every programme is designed and delivered by experienced paediatric complex care nurses.'],
                ['title' => 'CPD Accredited',          'description' => '21 hours of accredited CPD per programme, recognised nationally across the UK.'],
                ['title' => 'Regulatory Compliance',   'description' => 'Content aligned with CQC standards, NMC guidelines, and current national frameworks.'],
                ['title' => 'Personalised Support',    'description' => 'Small group sizes and dedicated facilitators ensure every learner gets the attention they need.'],
                ['title' => 'Proven Outcomes',         'description' => 'Measurable competency improvements tracked through pre- and post-course assessments.'],
                ['title' => 'Comprehensive Resources', 'description' => 'Full digital course materials, reference guides, and post-course access to learning resources.'],
            ])],

            // ── Testimonials ──────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'testimonials.headline', 'label' => 'Testimonials — Headline', 'type' => 'text', 'value' => 'What healthcare professionals say'],
            ['page' => 'home', 'key' => 'testimonials.items',    'label' => 'Testimonials — Items (JSON)', 'type' => 'json', 'value' => json_encode([
                ['quote' => 'The 3-day course completely transformed how I approach complex care. The clinical scenarios were incredibly realistic and the facilitators were outstanding. I left feeling genuinely confident.', 'name' => 'Sarah Mitchell', 'role' => 'Paediatric Community Nurse, NHS Trust', 'rating' => 5],
                ['quote' => 'I have attended many CPD courses over my career, but MMAB stands out for the quality of content and the practical focus. The safeguarding module alone was worth the entire programme.', 'name' => 'James Okafor', 'role' => 'Complex Care Coordinator, Independent Provider', 'rating' => 5],
                ['quote' => 'Our whole team attended and the impact on our practice has been immediate. The family-centred care sessions gave us a shared language that has genuinely improved our relationships with families.', 'name' => 'Dr. Priya Sharma', 'role' => 'Clinical Lead, Paediatric Complex Care', 'rating' => 5],
            ])],

            // ── Video section ─────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'video.title',    'label' => 'Video Section — Title',    'type' => 'text',     'value' => 'See how we make a difference'],
            ['page' => 'home', 'key' => 'video.subtitle', 'label' => 'Video Section — Subtitle', 'type' => 'textarea', 'value' => 'Watch how MMAB Consulting is transforming paediatric complex care training across the UK.'],

            // ── Case studies ──────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'cases.headline', 'label' => 'Case Studies — Headline', 'type' => 'text', 'value' => "How we've helped professionals and teams"],
            ['page' => 'home', 'key' => 'cases.items',    'label' => 'Case Studies — Items (JSON)', 'type' => 'json', 'value' => json_encode([
                ['tag' => 'Clinical Impact',          'title' => 'Improving tracheostomy safety across a community team',    'story' => 'A community nursing team of 14 attended the respiratory module following a series of near-miss incidents. Post-training audit showed a 94% improvement in protocol adherence and zero incidents in the 6 months following.', 'outcome' => '94% improvement in protocol adherence'],
                ['tag' => 'Professional Development', 'title' => 'Building confidence in newly qualified nurses',            'story' => 'A cohort of newly qualified nurses reported significant anxiety around complex care placements. Following the 3-day programme, 100% reported feeling "confident" or "very confident" in their clinical decision-making.', 'outcome' => '100% reported increased confidence'],
                ['tag' => 'Organisational Training',  'title' => 'Upskilling an entire independent care provider',          'story' => 'An independent complex care provider commissioned bespoke training for 40 staff across three cohorts. CQC inspection following the programme noted "outstanding" practice in staff knowledge and family engagement.', 'outcome' => 'CQC "Outstanding" rating achieved'],
            ])],

            // ── About block ───────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'about.headline', 'label' => 'About Block — Headline', 'type' => 'text',     'value' => 'Specialists in paediatric complex care education'],
            ['page' => 'home', 'key' => 'about.body1',    'label' => 'About Block — Paragraph 1', 'type' => 'textarea', 'value' => 'MMAB Consulting is a specialist healthcare training consultancy founded by experienced paediatric complex care clinicians. With over a decade of combined NHS and independent sector experience, our team brings unparalleled clinical depth to every programme.'],
            ['page' => 'home', 'key' => 'about.body2',    'label' => 'About Block — Paragraph 2', 'type' => 'textarea', 'value' => 'We deliver training nationwide, working with NHS trusts, independent care providers, and individual healthcare professionals across the UK.'],
            ['page' => 'home', 'key' => 'about.stats',    'label' => 'About Block — Stats (JSON)', 'type' => 'json', 'value' => json_encode([
                ['value' => '10+',     'label' => 'Years Experience'],
                ['value' => '500+',    'label' => 'Professionals Trained'],
                ['value' => 'UK-Wide', 'label' => 'Nationwide Delivery'],
                ['value' => 'CPD',     'label' => 'Accredited Courses'],
            ])],

            // ── CTA banner ────────────────────────────────────────────────────
            ['page' => 'home', 'key' => 'cta.headline', 'label' => 'CTA Banner — Headline', 'type' => 'text',     'value' => 'Your journey to better care starts here'],
            ['page' => 'home', 'key' => 'cta.subtext',  'label' => 'CTA Banner — Subtext',  'type' => 'textarea', 'value' => 'Speak to our specialist team today and take the first step towards advancing your clinical practice and improving outcomes for the children in your care.'],

            // ── Contact form section ──────────────────────────────────────────
            ['page' => 'home', 'key' => 'contact.headline', 'label' => 'Contact Form — Headline', 'type' => 'text',     'value' => 'Get in touch with our team'],
            ['page' => 'home', 'key' => 'contact.subtext',  'label' => 'Contact Form — Subtext',  'type' => 'textarea', 'value' => "Whether you're an individual professional or looking to arrange training for your organisation, we're here to help. Fill in the form and we'll be in touch within 24 hours."],

            // ── Global / site-wide ────────────────────────────────────────────
            ['page' => 'global', 'key' => 'site.phone',   'label' => 'Phone Number',   'type' => 'text', 'value' => '+44 (0) 000 000 0000'],
            ['page' => 'global', 'key' => 'site.email',   'label' => 'Email Address',  'type' => 'text', 'value' => 'info@mmabconsulting.com'],
            ['page' => 'global', 'key' => 'site.tagline', 'label' => 'Site Tagline',   'type' => 'text', 'value' => 'Paediatric Complex Care'],
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
