// خدمة تحليل المشاعر من النص (محاكاة للذكاء الاصطناعي)
export const analyzeSentiment = (text: string) => {
    // في الواقع، سنستخدم هنا نموذج NLP مثل Hugging Face
    // هذه محاكاة بسيطة
    const positiveWords = ['سعيد', 'فرح', 'ممتن', 'حماس', 'حب', 'سلام', 'رائع', 'جميل'];
    const negativeWords = ['حزين', 'قلق', 'وحيد', 'غاضب', 'مستاء', 'خائف', 'متعب'];

    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;

    if (positiveCount > negativeCount) return { emotion: 'positive', score: 0.8 };
    if (negativeCount > positiveCount) return { emotion: 'negative', score: -0.7 };
    return { emotion: 'neutral', score: 0 };
};

// خدمة توليد نصائح بناءً على المشاعر
export const generateInsight = (emotion: string  ) => {
    const insights: Record<string, string[]> = {
        joy: [
            'استمر في فعل ما يجعلك سعيدًا!',
            'شارك سعادتك مع الآخرين، فهذا سيزيدها',
            'احتفظ بمفكرة للامتنان لتذكر هذه اللحظات'
        ],
        sadness: [
            'تذكر أن المشاعر المؤقتة تزول مثل السحب',
            'تواصل مع صديق مقرب وتحدث عن مشاعرك',
            'جرب كتابة مشاعرك في ورقة ثم مزقها'
        ],
        gratitude: [
            'الامتنان هو مفتاح السعادة الدائمة',
            'شارك امتنانك مع شخص ساعدك مؤخرًا',
            'ابدأ يومك بتذكر ثلاثة أشياء تشعر بالامتنان لها'
        ],
        excitement: [
            'استغل هذه الطاقة في بدء مشروع جديد',
            'شارك حماسك مع الآخرين لتحفيزهم',
            'خطط لاستغلال هذه الطاقة بشكل منتج'
        ],
        peace: [
            'استغل هذا السلام الداخلي في التأمل',
            'حافظ على روتين يساعدك في البقاء في هذه الحالة',
            'شارك هذا السلام مع من حولك'
        ],
        anxiety: [
            'جرب تمارين التنفس العميق (4-7-8)',
            'قسّم مخاوفك إلى مشاكل صغيرة قابلة للحل',
            'خصص وقتًا للقلق ثم انتقل إلى نشاط آخر'
        ],
        loneliness: [
            'تواصل مع مجموعة دعم أو نادٍ اجتماعي',
            'تطوع لمساعدة الآخرين، فهذا يخلق روابط',
            'تعرف على أشخاص جدد يشاركونك اهتماماتك'
        ]
    };

    // اختيار نصيحة عشوائية
    const randomIndex = Math.floor(Math.random() * insights[emotion].length);
    return insights[emotion][randomIndex];
};

// خدمة تحويل الصوت إلى نص (محاكاة)
export const transcribeAudio = async (): Promise<string> => {
    // في الواقع، سنستخدم هنا خدمة مثل Google Speech-to-Text
    // هذه محاكاة تعيد نصوصًا عشوائية
    const transcriptions: Record<string, string[]> = {
        joy: [
            'أشعر بسعادة كبيرة اليوم لأنني أنهيت مشروعي النهائي بنجاح!',
            'اليوم كان رائعًا، قابلت أصدقاء قدامى وشعرت بفرح غامر',
            'حصلت على ترقية في العمل وأشعر بسعادة لا توصف'
        ],
        sadness: [
            'أشعر بالحزن الشديد بسبب خسارة شخص عزيز',
            'اليوم كان يومًا صعبًا، أشعر بالإرهاق والحزن',
            'فقدت شيئًا ثمينًا وأشعر بالحزن العميق'
        ],
        gratitude: [
            'أشعر بالامتنان لوجود عائلة داعمة في حياتي',
            'أنا ممتن لصحة جيدة وأصدقاء مقربين',
            'أشعر بالامتنان لكل الفرص التي حصلت عليها'
        ],
        excitement: [
            'سأبدأ مشروعي الجديد قريبًا وأشعر بحماس كبير!',
            'سأسافر إلى وجهة أحلامي الأسبوع القادم، أشعر بالإثارة',
            'حصلت على قبول في برنامج أحلم به، أشعر بحماس كبير'
        ],
        peace: [
            'اليوم قضيت وقتًا في التأمل وأشعر بالسلام الداخلي',
            'الطبيعة تمنحني شعورًا عميقًا بالسلام والهدوء',
            'أشعر بالسلام بعد اتخاذ قرار صعب كنت أتأرجح فيه'
        ],
        anxiety: [
            'أشعر بالقلق الشديد بشأن المستقبل وعدم الاستقرار',
            'لدي اختبار مهم وأشعر بالتوتر والقلق',
            'تغيرات كبيرة في حياتي تسبب لي القلق والتوتر'
        ],
        loneliness: [
            'أشعر بالوحدة الشديدة رغم وجود الناس حولي',
            'انتقلت إلى مدينة جديدة وأشعر بالوحدة',
            'أفتقد التواصل العميق مع الآخرين وأشعر بالعزلة'
        ]
    };

    // محاكاة التأخير الشبكي
    await new Promise(resolve => setTimeout(resolve, 1500));

    const emotion = Object.keys(transcriptions)[Math.floor(Math.random() * 7)];
    const randomIndex = Math.floor(Math.random() * transcriptions[emotion].length);

    return transcriptions[emotion][randomIndex];
  };