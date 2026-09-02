import { Artisan } from '@/types/artisan';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Phone, CheckCircle2, MessageSquare } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan & { image?: string };
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  const initials = artisan.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part: string) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 bg-white overflow-hidden flex flex-col justify-between rounded-2xl">
      <div>
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 sm:h-12 sm:w-12 border-2 border-blue-100 shadow-xs shrink-0">
                <AvatarImage src={artisan.image} alt={artisan.name} />
                <AvatarFallback className="bg-blue-600 text-white font-bold text-xs sm:text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 truncate">
                  <span className="truncate">{artisan.name}</span>
                  <CheckCircle2 size={16} className="text-blue-500 fill-blue-50 shrink-0" />
                </h3>
                <Badge variant="info" className="mt-1 font-medium text-[11px] px-2 py-0.5">
                  {artisan.category}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-gray-600 mt-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <span className="truncate">{artisan.location || 'Antananarivo'}</span>
            </div>

            {artisan.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <span className="font-mono text-xs">{artisan.phone}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 pt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < Math.floor(artisan.rating || 5)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900 text-xs sm:text-sm ml-1">
                {artisan.rating || 5.0}
              </span>
              <span className="text-gray-400 text-[11px] sm:text-xs">(Avis vérifiés)</span>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="bg-gray-50/80 px-5 sm:px-6 py-3 border-t flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-semibold gap-1.5 hover:bg-white h-9"
        >
          <Phone size={14} /> Appeler
        </Button>
        <Button
          size="sm"
          className="w-full text-xs font-semibold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white h-9"
        >
          <MessageSquare size={14} /> Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
