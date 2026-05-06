<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Seed the flagship paediatric complex care course.
     */
    public function run(): void
    {
        Course::firstOrCreate(
            ['slug' => 'paediatric-complex-care-3-day'],
            [
                'title' => 'Paediatric Complex Care: A Comprehensive 3-Day Clinical Course',
                'description' => 'An intensive, evidence-based programme covering all aspects of paediatric complex care. Designed for nurses, therapists, and allied health professionals working with children with complex health needs.',
                'overview' => 'This three-day clinical course provides healthcare professionals with the specialist knowledge, practical skills, and clinical confidence required to deliver outstanding care to children and young people with complex health needs. Delivered by experienced paediatric clinicians, the programme combines evidence-based theory with hands-on practical sessions and real-world case studies. Participants will leave with immediately applicable skills and a comprehensive understanding of best practice in paediatric complex care.',
                'learning_objectives' => [
                    'Understand the physiological and developmental needs of children with complex health conditions',
                    'Demonstrate competence in the assessment and management of common paediatric complex care presentations',
                    'Apply evidence-based frameworks to clinical decision-making in complex care settings',
                    'Effectively communicate with children, families, and multidisciplinary teams',
                    'Identify safeguarding considerations specific to children with complex needs',
                    'Develop and implement individualised care plans for children with complex health needs',
                    'Recognise and respond to clinical deterioration in paediatric complex care patients',
                    'Understand the legal and ethical frameworks governing paediatric complex care',
                ],
                'curriculum' => [
                    [
                        'day' => 'Day 1',
                        'title' => 'Foundations of Paediatric Complex Care',
                        'topics' => [
                            'Introduction to paediatric complex care: definitions and scope',
                            'Child development and the impact of complex health conditions',
                            'Anatomy and physiology relevant to complex care presentations',
                            'Assessment frameworks: ABCDE and paediatric-specific tools',
                            'Respiratory management: tracheostomy care and ventilator support',
                            'Enteral feeding: NG, NJ, and gastrostomy management',
                            'Practical skills stations: airway management and feeding tube care',
                        ],
                    ],
                    [
                        'day' => 'Day 2',
                        'title' => 'Clinical Management & Specialist Interventions',
                        'topics' => [
                            'Neurological conditions in paediatric complex care',
                            'Epilepsy management and emergency protocols',
                            'Medication management and administration in complex care',
                            'Pain assessment and management in non-verbal children',
                            'Skin integrity and pressure area care',
                            'Moving and handling: specialist equipment and techniques',
                            'Case study workshops: applying clinical knowledge to practice',
                        ],
                    ],
                    [
                        'day' => 'Day 3',
                        'title' => 'Holistic Care, Safeguarding & Professional Practice',
                        'topics' => [
                            'Family-centred care: working in partnership with parents and carers',
                            'Safeguarding children with complex needs: recognition and response',
                            'Transition planning: from paediatric to adult services',
                            'Mental health and wellbeing of children with complex needs',
                            'Ethical and legal frameworks in paediatric complex care',
                            'Documentation, record-keeping, and professional accountability',
                            'Simulation scenarios and competency assessment',
                            'Course summary, reflection, and next steps',
                        ],
                    ],
                ],
                'accreditation' => 'CPD Accredited — 21 Hours',
                'duration' => '3 Days',
                'location' => 'UK Venues',
                'price' => '595.00',
                'is_active' => true,
            ],
        );
    }
}
