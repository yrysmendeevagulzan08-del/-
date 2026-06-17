import { useState } from 'react';
import { Review } from '../types';
import { Star, MessageSquare, Award, CornerDownRight, Check, AlertCircle } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
  lang: 'ky' | 'en';
}

export default function Reviews({ reviews, onAddReview, lang }: ReviewsProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [roomType, setRoomType] = useState('Панорамалык Делюкс бөлмө');
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  // Aggregate computation
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const countByStars = (stars: number) => {
    return reviews.filter(r => r.rating === stars).length;
  };

  const getStarPercentage = (stars: number) => {
    if (totalReviews === 0) return '0%';
    return `${(countByStars(stars) / totalReviews) * 100}%`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Math.floor(1000 + Math.random() * 9000),
      guestName: name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      roomType
    };

    onAddReview(newRev);
    
    // Clear form inputs & show success notice
    setName('');
    setRating(5);
    setComment('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4500);
  };

  const roomOptions = [
    { labelKy: 'Эки кишилик Стандарт бөлмө', labelEn: 'Double Standard Room' },
    { labelKy: 'Панорамалык Делюкс бөлмө', labelEn: 'Panoramic Deluxe Room' },
    { labelKy: 'Үй-бүлөлүк Люкс апартаменти', labelEn: 'Family Luxury Suite' },
    { labelKy: 'Президенттик Империал Апартаменти', labelEn: 'Presidential Imperial Suite' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-12">
        
        {/* Header Block */}
        <div className="border-b border-stone-200 pb-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading uppercase">
            {lang === 'ky' ? 'Баалоолор жана Пикирлер' : 'Guest Reviews & Ratings'}
          </h2>
          <p className="text-stone-500 font-light text-sm mt-1 leading-relaxed">
            {lang === 'ky' 
              ? 'Ала-Тоо Grand отелинде эс алып кеткен коноктордун чынчыл пикирлери. Биз ар бир коноктун сунуш-пикирин угуп, кызматыбызды жакшырта беребиз.' 
              : 'Authentic testimonials logged by our past resort visitors. We analyze every single piece of feedback to elevate our hospitality.'}
          </p>
        </div>

        {/* Aggregates Dashboard Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center bg-white p-6 sm:p-8 border border-stone-200/90 rounded-2xl shadow-xs">
          
          {/* Average Rating Block */}
          <div className="text-center md:border-r md:border-stone-200/80 md:pr-8 space-y-2">
            <span className="text-xs uppercase text-stone-500 tracking-wider font-bold block">
              {lang === 'ky' ? 'ОРТОЧО БААЛОО' : 'OVERALL SATISFACTION'}
            </span>
            <div className="text-5xl font-black text-amber-900 font-mono tracking-tighter block leading-none">
              {averageRating}
            </div>
            {/* Visual stars */}
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 5 }, (_, idx) => (
                <Star 
                  key={idx} 
                  className={`h-5 w-5 ${
                    idx < Math.round(Number(averageRating)) ? 'fill-amber-500 text-amber-500' : 'text-stone-200'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-stone-500 block font-light">
              {lang === 'ky' ? `${totalReviews} пикир негизинде` : `Based on ${totalReviews} verified stays`}
            </span>
          </div>

          {/* Progress bar statistics */}
          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = countByStars(stars);
              const pct = getStarPercentage(stars);
              return (
                <div key={stars} className="flex items-center space-x-3.5 text-xs text-stone-600">
                  <div className="flex items-center space-x-1 shrink-0 w-12 justify-end">
                    <span>{stars}</span>
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  </div>
                  {/* Outer bar */}
                  <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200/40">
                    <div 
                      className="bg-amber-800 h-full rounded-full transition-all duration-500" 
                      style={{ width: pct }}
                    />
                  </div>
                  {/* Percent or count indicator */}
                  <span className="shrink-0 w-10 text-right font-mono text-stone-600 font-semibold">{count}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Form and Feedback Split section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left: Input Comment Form */}
          <div className="lg:col-span-2 bg-[#FAF9F6] border border-stone-250 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1 pb-3 border-b border-stone-200/50">
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-tight">
                {lang === 'ky' ? 'Пикир калтыруу' : 'Share Your Experience'}
              </h3>
              <p className="text-[11px] text-stone-550 leading-relaxed font-light">
                {lang === 'ky' ? 'Башка конокторго бөлмө тандоодо сизге жаккан учурларды айтып жардам бериңиз.' : 'Tell future travelers about your stay, food quality, and view impressions.'}
              </p>
            </div>

            {successMsg && (
              <div className="bg-emerald-100 text-emerald-900 border border-emerald-200 p-3 rounded-lg text-xs font-semibold flex items-center space-x-2 animate-bounce">
                <Check className="h-4 w-4 text-emerald-800" />
                <span>{lang === 'ky' ? 'Пикириңиз ийгиликтүү кошулду! Чоң рахмат!' : 'Your review was logged successfully! Thank you so much!'}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {lang === 'ky' ? 'Коноктун аты-жөнү' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ky' ? 'Аскар Асанов' : 'Mark Spencer'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-850 focus:outline-hidden focus:border-amber-800 transition-colors"
                />
              </div>

              {/* Room selections stayed */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {lang === 'ky' ? 'Кайсы бөлмөдө жайгаштыңыз?' : 'Stayed Room type'}
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-850 focus:outline-hidden focus:border-amber-800"
                >
                  {roomOptions.map((opt, idx) => (
                    <option key={idx} value={lang === 'ky' ? opt.labelKy : opt.labelEn}>
                      {lang === 'ky' ? opt.labelKy : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interactive Golden Star Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  {lang === 'ky' ? 'Отелди баалоо (1-5 жылдыз)' : 'Rating evaluation'}
                </label>
                <div className="flex space-x-1.5 p-1 w-fit bg-white border border-stone-200 rounded-lg">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <button
                      key={starNum}
                      type="button"
                      onClick={() => setRating(starNum)}
                      onMouseEnter={() => setHoverRating(starNum)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="text-stone-350 hover:scale-110 transition-transform focus:outline-hidden cursor-pointer"
                    >
                      <Star 
                        className={`h-6 w-6 ${
                          starNum <= (hoverRating ?? rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-200'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text area input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {lang === 'ky' ? 'Сиздин пикириңиз' : 'Your review text'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={lang === 'ky' ? 'Баары абдан жакты! Тейлөө жогорку деңгээлде экен...' : 'We had an amazing vacation. The hot pools were incredible...'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white border border-stone-205 hover:border-stone-305 rounded-lg px-3.5 py-2.5 text-xs text-stone-850 focus:outline-hidden focus:border-amber-805 font-light"
                />
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                className="w-full bg-stone-900 hover:bg-amber-800 text-stone-100 font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-sm cursor-pointer"
              >
                <span>{lang === 'ky' ? 'Пикир калтыруу' : 'Publish Review'}</span>
              </button>

            </form>
          </div>

          {/* Right: Render Guest Reviews Stack */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-sm font-black text-stone-800 uppercase tracking-wider pl-1 font-sans flex items-center gap-1.5 border-b border-stone-100 pb-2.5">
              <MessageSquare className="h-4 w-4 text-amber-880 stroke-[2.5]" />
              <span>{lang === 'ky' ? 'Акыркы Конок Сын-Пикирлери' : 'Recent Visitor Feedbacks'}</span>
            </h3>

            {reviews.length === 0 ? (
              <div className="text-center py-10 bg-white border border-stone-200 rounded-xl p-4 text-sm text-stone-500">
                {lang === 'ky' ? 'Пикирлер тизмеси азырынча жок.' : 'No guest feedback available yet.'}
              </div>
            ) : (
              <div className="space-y-5 max-h-[620px] overflow-y-auto pr-1">
                {[...reviews].reverse().map((r) => (
                  <div 
                    key={r.id} 
                    className="bg-white border border-stone-200 hover:border-stone-300 p-5 rounded-xl shadow-xs space-y-3.5 transition-all text-sm font-sans"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100/80 pb-2.5">
                      <div>
                        <span className="font-bold text-stone-900 block leading-tight">{r.guestName}</span>
                        <span className="text-[10px] text-stone-500 font-light block mt-0.5 flex items-center gap-1">
                          <CornerDownRight className="h-3 w-3 text-amber-800" />
                          <span>{lang === 'ky' ? 'жайгашты: ' : 'stayed: '} <strong>{r.roomType}</strong></span>
                        </span>
                      </div>
                      
                      {/* Date indicator */}
                      <span className="text-[11px] text-stone-400 font-light font-mono ml-auto">
                        {r.date}
                      </span>
                    </div>

                    {/* Evaluated Stars */}
                    <div className="flex space-x-0.5">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-4 w-4 ${
                            idx < r.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-200'
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Paragraph */}
                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line bg-stone-50 p-3 rounded-lg border border-stone-100">
                      "{r.comment}"
                    </p>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
