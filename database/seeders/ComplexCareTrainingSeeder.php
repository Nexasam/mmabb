<?php

namespace Database\Seeders;

use App\Models\Assessment;
use App\Models\Course;
use Illuminate\Database\Seeder;

class ComplexCareTrainingSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::firstOrCreate(
            ['slug' => 'three-day-complex-care-training'],
            [
                'title' => 'Three-Day Complex Care Training for Health Care Professionals in the Community',
                'slug' => 'three-day-complex-care-training',
                'description' => 'A comprehensive three-day training programme covering complex care skills for health care professionals working in community settings.',
                'overview' => 'This programme equips community health care professionals with the knowledge and practical skills to manage complex care needs including tracheostomy care, ventilation, enteral feeding, neurological emergencies, dysphagia, and safe medication administration.',
                'learning_objectives' => [
                    'Understand the distinction between hospital patient care and community person-centred care',
                    'Perform a structured ABCDE clinical assessment',
                    'Manage tracheostomy care and associated emergencies',
                    'Understand invasive and non-invasive ventilation and respond to ventilator alarms',
                    'Differentiate between BIPAP and CPAP modes and settings',
                    'Understand enteral feeding methods including PEG and PEJ',
                    'Identify silent aspiration in patients without a cough reflex',
                    'Recognise and respond to seizures and epilepsy',
                    'Administer buccal Midazolam safely',
                    'Apply the universal drug dosage calculation formula accurately',
                    'Communicate effectively using the SBAR protocol in emergencies',
                ],
                'curriculum' => [
                    [
                        'day' => 'Day 1',
                        'title' => 'Person-Centred Care, Clinical Assessment & Airway Management',
                        'topics' => [
                            'Person versus Patient — community care philosophy',
                            'Order of clinical assessment (ABCDE approach)',
                            'Tracheostomy care and mucus plug prevention',
                            'Emergency box and tube management',
                        ],
                    ],
                    [
                        'day' => 'Day 2',
                        'title' => 'Ventilation, Gastrointestinal Care & Dysphagia',
                        'topics' => [
                            'Invasive vs non-invasive ventilation',
                            'Low and high pressure ventilator alarms',
                            'BIPAP vs CPAP modes and settings',
                            'Enteral feeding — PEG vs PEJ',
                            'Silent aspiration and dysphagia management',
                        ],
                    ],
                    [
                        'day' => 'Day 3',
                        'title' => 'Neurology, Medications & Emergency Communication',
                        'topics' => [
                            'Seizures and epilepsy management',
                            'Rescue medications — buccal Midazolam',
                            'Drug dosage calculations (universal formula)',
                            'SBAR protocol for emergency calls',
                        ],
                    ],
                ],
                'accreditation' => 'Certificate of Completion issued upon passing the post-training assessment.',
                'duration' => '3 days',
                'location' => 'Community / On-site',
                'price' => '0.00',
                'is_active' => true,
            ]
        );

        // Remove any existing assessment for this course to avoid duplicates
        Assessment::where('course_id', $course->id)
            ->where('title', 'Post-Training Assessment')
            ->delete();

        Assessment::create([
            'course_id' => $course->id,
            'title' => 'Post-Training Assessment',
            'instructions' => 'Please answer all questions in the spaces provided below. Completion of this assessment is required to receive your certificate. Answer in your own words — there are no trick questions. Your responses will be reviewed by a trainer.',
            'time_limit_minutes' => 120,
            'is_active' => true,
            'questions' => [
                [
                    'question' => 'Person versus Patient: What distinguishes a "patient" within a hospital from a "person" in the community?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Order of Clinical Assessment: If your patient presents with a "grey" appearance, what is the precise sequence in which you should assess them?',
                    'type' => 'text',
                    'marks' => 5,
                    'optional' => false,
                ],
                [
                    'question' => 'Airway – Mucus Plugs: Why does a tracheostomy lead to the formation of "mucus plugs," whereas this is not an issue with normal nasal breathing?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Emergency – The Emergency Box: When the tube has been removed and cannot be reinserted, why is having access to a smaller-sized tube advantageous?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Ventilation: What is the difference between invasive and non-invasive ventilation? Give examples of each.',
                    'type' => 'text',
                    'marks' => 5,
                    'optional' => false,
                ],
                [
                    'question' => 'Low Pressure Alarms: If the ventilator alarms for "Low Pressure" and the circuit remains connected, where might the air be escaping? What would you do?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'High Pressure Alarms: If the ventilator alarms for "High Pressure" and the circuit remains connected, where might the blockage or issue be occurring? What would you do?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'BIPAP vs. CPAP: What is the difference between BIPAP and CPAP mode?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'BIPAP vs. CPAP: What are the differences between BIPAP and CPAP settings? Provide examples.',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Gastrointestinal – PEG vs. PEJ: What is enteral feeding?',
                    'type' => 'text',
                    'marks' => 3,
                    'optional' => false,
                ],
                [
                    'question' => 'Gastrointestinal – PEG vs. PEJ: What are the indications for enteral feeding?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Gastrointestinal – PEG vs. PEJ: Name the different types of enteral feeding and state the indications for each method.',
                    'type' => 'text',
                    'marks' => 5,
                    'optional' => false,
                ],
                [
                    'question' => 'Gastrointestinal – PEG vs. PEJ: What are the differences between the enteral feeding methods?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Gastrointestinal – PEG vs. PEJ: Why is it permissible to bolus feed into the stomach (via PEG) but contraindicated for the small bowel (via PEJ)?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Dysphagia – Silent Aspiration: How can "Silent Aspiration" be identified in a patient lacking a cough reflex?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Neurology – Seizures/Epilepsy: What electrical phenomena occur in the brain during a seizure?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Neurology – Seizures/Epilepsy: What is the rationale for waiting five minutes before administering rescue medications?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => 'Rescue Medications – Buccal Administration: What is the clinical reasoning behind administering Midazolam via the buccal route instead of oral ingestion?',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
                [
                    'question' => "Dosage Calculations – The Universal Formula (D ÷ H × Q = X):\n\nScenario 1: A doctor prescribes 500 mg of Metformin. You find tablets labelled 250 mg.\nD: 500 mg | H: 250 mg | Q: 1 tablet\n\nUsing the formula, calculate how many tablets to administer and show your working.",
                    'type' => 'text',
                    'marks' => 3,
                    'optional' => false,
                ],
                [
                    'question' => "Dosage Calculations – The Universal Formula (D ÷ H × Q = X):\n\nScenario 2: A patient requires 300 mg of Ibuprofen liquid. The bottle states 100 mg per 5 mL.\nD: 300 mg | H: 100 mg | Q: 5 mL\n\nUsing the formula, calculate the volume to administer and show your working.",
                    'type' => 'text',
                    'marks' => 3,
                    'optional' => false,
                ],
                [
                    'question' => 'Dosage Calculations – The 2 mL Issue: For a dose of 12.5 mg and a solution concentration of 10 mg/2 mL, why is using 2 mL insufficient for accurate clinical dosing?',
                    'type' => 'text',
                    'marks' => 3,
                    'optional' => false,
                ],
                [
                    'question' => 'Dosage Calculations: Calculate how many 500 mg tablets are required for a 1 g Paracetamol dose. Show your working.',
                    'type' => 'text',
                    'marks' => 3,
                    'optional' => false,
                ],
                [
                    'question' => 'Dosage Calculations: Determine the required volume of a 250 mg/5 mL Paracetamol solution for a 180 mg dose. Show your working.',
                    'type' => 'text',
                    'marks' => 3,
                    'optional' => false,
                ],
                [
                    'question' => 'SBAR Protocol – Emergency Calls: How can you effectively communicate a patient crisis to a 999 operator using only four sentences? Write out your four sentences.',
                    'type' => 'text',
                    'marks' => 4,
                    'optional' => false,
                ],
            ],
        ]);

        $this->command->info('✓ Three-Day Complex Care Training course and assessment seeded successfully.');
        $this->command->info("  Course: {$course->title}");
        $this->command->info('  Assessment: Post-Training Assessment (24 questions, 120 min, 96 marks total)');
    }
}
