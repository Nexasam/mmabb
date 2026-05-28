<?php

namespace Database\Seeders;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\Course;
use App\Models\SurveyLink;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Courses ───────────────────────────────────────────────────────────
        $this->call([
            CourseSeeder::class,
            ComplexCareTrainingSeeder::class,
            PageContentSeeder::class,
        ]);

        $course = Course::where('slug', 'paediatric-complex-care-3-day')->first();
        $complexCourse = Course::where('slug', 'three-day-complex-care-training')->first();

        // ── Admin user ────────────────────────────────────────────────────────
        $admin = User::firstOrCreate(
            ['email' => 'admin@mmabconsulting.com'],
            [
                'name'               => 'superadmin',
                'password'           => bcrypt('password'),
                'role'               => 'admin',
                'email_verified_at'  => now(),
            ],
        );

        // ── Applicant users ───────────────────────────────────────────────────
        $applicants = [
            ['name' => 'James Okafor',    'email' => 'james.okafor@nhs.net',         'phone' => '07700 900 111', 'bg' => 'Paediatric community nurse with 4 years NHS experience.'],
            ['name' => 'Priya Sharma',    'email' => 'priya.sharma@careprovider.co.uk','phone' => '07700 900 222', 'bg' => 'Complex care coordinator at an independent provider.'],
            ['name' => 'Tom Walsh',       'email' => 'tom.walsh@nhstrust.org',        'phone' => '07700 900 333', 'bg' => 'Newly qualified nurse seeking specialist training.'],
            ['name' => 'Amina Hassan',    'email' => 'amina.hassan@homecare.co.uk',   'phone' => '07700 900 444', 'bg' => 'Home care nurse, 6 years experience with complex needs children.'],
            ['name' => 'Daniel Carter',   'email' => 'daniel.carter@nhs.net',         'phone' => '07700 900 555', 'bg' => 'Paediatric physiotherapist transitioning to complex care.'],
            ['name' => 'Lucy Patel',      'email' => 'lucy.patel@carehome.co.uk',     'phone' => '07700 900 666', 'bg' => 'Senior carer supporting children with neurological conditions.'],
        ];

        $users = [];
        foreach ($applicants as $data) {
            $users[] = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name'              => $data['name'],
                    'password'          => bcrypt('password'),
                    'role'              => 'user',
                    'email_verified_at' => now(),
                ],
            );
        }

        // ── Applications ──────────────────────────────────────────────────────
        $statuses = [
            ApplicationStatus::Approved,
            ApplicationStatus::Approved,
            ApplicationStatus::Approved,
            ApplicationStatus::Pending,
            ApplicationStatus::Pending,
            ApplicationStatus::Rejected,
        ];

        $adminNotes = [
            'Approved — strong clinical background.',
            'Approved — excellent application.',
            'Approved — meets all criteria.',
            null,
            null,
            'Rejected — does not meet the minimum clinical experience requirement.',
        ];

        foreach ($users as $i => $user) {
            $targetCourse = $i % 2 === 0 ? $course : $complexCourse;
            if (! $targetCourse) {
                $targetCourse = $course;
            }

            Application::firstOrCreate(
                ['email' => $user->email, 'course_id' => $targetCourse->id],
                [
                    'user_id'                 => $user->id,
                    'full_name'               => $user->name,
                    'phone'                   => $applicants[$i]['phone'],
                    'professional_background' => $applicants[$i]['bg'],
                    'status'                  => $statuses[$i],
                    'admin_notes'             => $adminNotes[$i],
                ],
            );
        }

        // ── Assessment submissions for approved users ─────────────────────────
        $assessment = Assessment::where('course_id', $complexCourse?->id)->first();

        if ($assessment) {
            $approvedUsers = array_slice($users, 0, 3);

            $sampleAnswers = [
                [
                    ['question_index' => 0,  'answer' => 'A patient in hospital is under medical authority and follows clinical protocols. A person in the community retains autonomy, choice, and is supported in their own home environment.'],
                    ['question_index' => 1,  'answer' => 'Airway, Breathing, Circulation, Disability, Exposure — in that order using the ABCDE approach.'],
                    ['question_index' => 2,  'answer' => 'A tracheostomy bypasses the nose and mouth which normally warm, humidify and filter air. Without this, secretions dry out and form plugs.'],
                    ['question_index' => 3,  'answer' => 'A smaller tube can pass through a partially closed stoma, maintaining the airway until a correctly sized tube is available.'],
                    ['question_index' => 4,  'answer' => 'Invasive ventilation uses an artificial airway such as a tracheostomy. Non-invasive uses a mask, e.g. BIPAP or CPAP.'],
                    ['question_index' => 5,  'answer' => 'Air may be escaping from a loose circuit connection or cuff leak. I would check all connections and the cuff pressure.'],
                    ['question_index' => 6,  'answer' => 'A blockage in the circuit or airway, e.g. mucus plug. I would suction the airway and check the circuit for kinks.'],
                    ['question_index' => 7,  'answer' => 'BIPAP delivers two pressure levels — inspiratory and expiratory. CPAP delivers one continuous pressure.'],
                    ['question_index' => 8,  'answer' => 'BIPAP: IPAP 14, EPAP 6. CPAP: single pressure e.g. 8 cmH2O.'],
                    ['question_index' => 9,  'answer' => 'Enteral feeding is the delivery of nutrition directly into the gastrointestinal tract via a tube.'],
                    ['question_index' => 10, 'answer' => 'Inability to swallow safely, neurological conditions, failure to thrive, or post-surgical recovery.'],
                    ['question_index' => 11, 'answer' => 'NG tube for short-term, PEG for long-term gastric feeding, PEJ for post-pyloric feeding when gastric feeding is not tolerated.'],
                    ['question_index' => 12, 'answer' => 'PEG sits in the stomach, PEJ in the jejunum. PEG allows bolus feeding, PEJ requires continuous pump feeding.'],
                    ['question_index' => 13, 'answer' => 'The stomach can accommodate bolus volumes and has a reservoir function. The small bowel cannot tolerate large volumes rapidly.'],
                    ['question_index' => 14, 'answer' => 'Recurrent chest infections, cyanosis, desaturations during feeding, or wet/gurgly voice without coughing.'],
                    ['question_index' => 15, 'answer' => 'Abnormal, excessive electrical discharges between neurons causing synchronised firing across brain regions.'],
                    ['question_index' => 16, 'answer' => 'Most seizures self-terminate within 5 minutes. Early medication carries risks of respiratory depression without clear benefit.'],
                    ['question_index' => 17, 'answer' => 'Buccal administration allows rapid absorption through the oral mucosa, bypassing the GI tract and acting faster than oral ingestion.'],
                    ['question_index' => 18, 'answer' => '500 ÷ 250 × 1 = 2 tablets.'],
                    ['question_index' => 19, 'answer' => '300 ÷ 100 × 5 = 15 mL.'],
                    ['question_index' => 20, 'answer' => '12.5 ÷ 10 × 2 = 2.5 mL. Using 2 mL would underdose the patient by 0.5 mL.'],
                    ['question_index' => 21, 'answer' => '1000 ÷ 500 × 1 = 2 tablets.'],
                    ['question_index' => 22, 'answer' => '180 ÷ 250 × 5 = 3.6 mL.'],
                    ['question_index' => 23, 'answer' => "Situation: I'm calling about [patient name] who is deteriorating. Background: They have [condition] and their baseline is [X]. Assessment: They are currently [grey, not breathing normally]. Recommendation: I need an ambulance immediately."],
                ],
                [
                    ['question_index' => 0,  'answer' => 'In hospital, the patient is in a clinical environment with immediate medical support. In the community, the person is at home and care must be adapted to their environment and wishes.'],
                    ['question_index' => 1,  'answer' => 'ABCDE — Airway first, then Breathing, Circulation, Disability, Exposure.'],
                    ['question_index' => 2,  'answer' => 'Normal breathing through the nose warms and humidifies air. A tracheostomy bypasses this, causing secretions to thicken and form plugs.'],
                    ['question_index' => 3,  'answer' => 'The stoma may begin to close. A smaller tube can still be inserted to keep the airway patent while waiting for the correct size.'],
                    ['question_index' => 4,  'answer' => 'Invasive: ventilation via tracheostomy or ETT. Non-invasive: BIPAP or CPAP via mask.'],
                    ['question_index' => 5,  'answer' => 'Possible cuff deflation or loose connection. Check and tighten all connections, check cuff pressure.'],
                    ['question_index' => 6,  'answer' => 'Secretion build-up or kinked tubing. Suction the patient and check the circuit.'],
                    ['question_index' => 7,  'answer' => 'CPAP provides one constant pressure. BIPAP provides two — a higher pressure on inspiration and lower on expiration.'],
                    ['question_index' => 8,  'answer' => 'CPAP: 10 cmH2O. BIPAP: IPAP 16, EPAP 8.'],
                    ['question_index' => 9,  'answer' => 'Delivering nutrition via a tube into the stomach or intestine.'],
                    ['question_index' => 10, 'answer' => 'Dysphagia, neurological impairment, malnutrition, or inability to meet nutritional needs orally.'],
                    ['question_index' => 11, 'answer' => 'NG: short-term, nasogastric. PEG: long-term, gastric. PEJ: post-pyloric, for those who cannot tolerate gastric feeding.'],
                    ['question_index' => 12, 'answer' => 'PEG is in the stomach and allows bolus feeding. PEJ is in the jejunum and requires continuous feeding.'],
                    ['question_index' => 13, 'answer' => 'The stomach acts as a reservoir and can handle bolus volumes. The jejunum cannot — it requires slow continuous delivery.'],
                    ['question_index' => 14, 'answer' => 'Chest infections, desaturations, or changes in breathing pattern during or after feeding without coughing.'],
                    ['question_index' => 15, 'answer' => 'Uncontrolled electrical activity in the brain causing neurons to fire abnormally and synchronously.'],
                    ['question_index' => 16, 'answer' => 'Most seizures stop on their own within 5 minutes. Giving medication too early increases the risk of respiratory depression.'],
                    ['question_index' => 17, 'answer' => 'The buccal mucosa has a rich blood supply allowing rapid absorption. Oral ingestion would be too slow and unreliable during a seizure.'],
                    ['question_index' => 18, 'answer' => '500 ÷ 250 × 1 = 2 tablets.'],
                    ['question_index' => 19, 'answer' => '300 ÷ 100 × 5 = 15 mL.'],
                    ['question_index' => 20, 'answer' => 'The correct dose is 2.5 mL. Using 2 mL gives only 10 mg, which is 2.5 mg short of the prescribed dose.'],
                    ['question_index' => 21, 'answer' => '1000 ÷ 500 = 2 tablets.'],
                    ['question_index' => 22, 'answer' => '180 ÷ 250 × 5 = 3.6 mL.'],
                    ['question_index' => 23, 'answer' => "S: I'm calling about [name], who is unresponsive. B: They have a tracheostomy and are ventilator-dependent. A: They are not breathing and have no pulse. R: Please send an ambulance immediately to [address]."],
                ],
                [
                    ['question_index' => 0,  'answer' => 'A hospital patient is in an acute setting with clinical oversight. A community person is in their own home and care is person-centred around their life.'],
                    ['question_index' => 1,  'answer' => 'Airway, Breathing, Circulation, Disability, Exposure.'],
                    ['question_index' => 2,  'answer' => 'The nose filters and humidifies air. A tracheostomy bypasses this so secretions dry and thicken into plugs.'],
                    ['question_index' => 3,  'answer' => 'A smaller tube can fit through a narrowing stoma to maintain the airway temporarily.'],
                    ['question_index' => 4,  'answer' => 'Invasive uses a tube in the airway. Non-invasive uses a mask. Examples: tracheostomy ventilation vs CPAP.'],
                    ['question_index' => 5,  'answer' => 'Air escaping from a loose connection or deflated cuff. Check all connections and re-inflate the cuff.'],
                    ['question_index' => 6,  'answer' => 'Blocked airway or kinked tubing. Suction and check the circuit.'],
                    ['question_index' => 7,  'answer' => 'BIPAP has two pressure settings. CPAP has one.'],
                    ['question_index' => 8,  'answer' => 'BIPAP: IPAP 12, EPAP 5. CPAP: 8 cmH2O.'],
                    ['question_index' => 9,  'answer' => 'Feeding through a tube into the gut.'],
                    ['question_index' => 10, 'answer' => 'Swallowing difficulties, neurological conditions, or failure to thrive.'],
                    ['question_index' => 11, 'answer' => 'NG for short-term, PEG for long-term stomach feeding, PEJ for small bowel feeding.'],
                    ['question_index' => 12, 'answer' => 'PEG is in the stomach, PEJ in the small bowel. PEG allows bolus, PEJ needs continuous feeding.'],
                    ['question_index' => 13, 'answer' => 'The stomach can hold large volumes. The small bowel cannot tolerate rapid large volumes.'],
                    ['question_index' => 14, 'answer' => 'Chest infections, wet breathing, or desaturations without coughing.'],
                    ['question_index' => 15, 'answer' => 'Abnormal electrical discharges in the brain.'],
                    ['question_index' => 16, 'answer' => 'Most seizures stop within 5 minutes naturally. Early medication risks respiratory depression.'],
                    ['question_index' => 17, 'answer' => 'Faster absorption through the cheek lining compared to swallowing.'],
                    ['question_index' => 18, 'answer' => '2 tablets.'],
                    ['question_index' => 19, 'answer' => '15 mL.'],
                    ['question_index' => 20, 'answer' => 'The correct dose is 2.5 mL. 2 mL only delivers 10 mg, underdosing by 2.5 mg.'],
                    ['question_index' => 21, 'answer' => '2 tablets.'],
                    ['question_index' => 22, 'answer' => '3.6 mL.'],
                    ['question_index' => 23, 'answer' => "S: [Patient] is deteriorating. B: History of [condition]. A: Currently grey and unresponsive. R: Need emergency ambulance now."],
                ],
            ];

            foreach ($approvedUsers as $i => $user) {
                $submission = AssessmentSubmission::firstOrCreate(
                    ['assessment_id' => $assessment->id, 'user_id' => $user->id],
                    [
                        'answers'      => $sampleAnswers[$i],
                        'started_at'   => now()->subHours(3),
                        'submitted_at' => now()->subHours(2),
                    ],
                );

                // Mark the first two, leave the third pending
                if ($i < 2) {
                    $totalMarks = collect($assessment->questions)->sum('marks');
                    $score = $i === 0 ? 88 : 74;

                    $submission->update([
                        'question_marks' => collect($assessment->questions)->map(fn ($q, $idx) => [
                            'question_index' => $idx,
                            'awarded'        => round($q['marks'] * ($score / 100)),
                        ])->values()->all(),
                        'score'          => $score,
                        'marker_notes'   => $i === 0
                            ? 'Excellent responses throughout. Strong clinical reasoning demonstrated.'
                            : 'Good overall. Some dosage calculation answers could be more detailed.',
                        'marked_at'      => now()->subHour(),
                    ]);
                }
            }
        }

        // ── Survey link ───────────────────────────────────────────────────────
        SurveyLink::firstOrCreate(
            ['token' => 'demo123abc45'],
            [
                'title'       => 'Post-Session Feedback — Complex Care Training',
                'description' => 'Please complete after each training day',
                'url'         => 'https://forms.google.com/your-form-id-here',
                'is_active'   => true,
            ],
        );

        $this->command->info('✓ Database seeded with demo data.');
        $this->command->info('  Admin:     admin@mmabconsulting.com / password');
        $this->command->info('  Applicant: james.okafor@nhs.net / password');
    }
}
