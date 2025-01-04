import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
          <AvatarFallback>DN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Dadang Nurjana</p>
          <p className="text-sm text-muted-foreground">
            dadang.nurjana@email.com
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Usep</p>
          <p className="text-sm text-muted-foreground">usep@email.com</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
          <AvatarFallback>YK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Yanto Kosasih</p>
          <p className="text-sm text-muted-foreground">
            yanto.kosasih@email.com
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ceceng Ramadhan</p>
          <p className="text-sm text-muted-foreground">
            ceceng.ramadhan@email.com
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/05.png" alt="Avatar" /> */}
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sinta Dewi</p>
          <p className="text-sm text-muted-foreground">sinta.dewi@email.com</p>
        </div>
      </div>
    </div>
  );
}
