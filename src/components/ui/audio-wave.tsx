import { Pause, Play } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import WaveSurfer from "wavesurfer.js";
import DownloadIcon from "@/assets/icons/download.svg";
import { downloadAudio } from "@/lib/utils";
import { useDeleteCallMutation } from "@/store/services/call";
import WarningModal from "../warning-modal";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface AudioWaveProps {
  monoUrl: string;
  call_id?: string;
  stereoUrl: string;
}

const AudioWave = ({ call_id, monoUrl, stereoUrl }: AudioWaveProps) => {
  const waveFormRef = useRef<HTMLDivElement>(null);
  const [warn, setWarn] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMono, setIsMono] = useState<string>("mono");
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [deleteCall, { isLoading }] = useDeleteCallMutation();

  const handleDelete = async () => {
    const response = await deleteCall(call_id as string);

    if (response?.data) {
      toast.success("Call deleted successfully");
    } else {
      toast.error("Failed to delete call");
    }
  };

  const togglePlay = async () => {
    if (waveSurferRef.current) {
      await waveSurferRef.current.playPause();

      setIsPlaying(waveSurferRef.current.isPlaying());
    }
  };

  const download = async () => {
    if (isMono === "mono") {
      await downloadAudio(monoUrl);
    } else {
      await downloadAudio(stereoUrl);
    }
  };

  useEffect(() => {
    if (!waveFormRef.current) {
      return;
    }

    waveSurferRef.current = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#4A90E2",
      progressColor: "#357ABD",
      cursorColor: "#000",
      barWidth: 2,
      barGap: 1,
      height: 100,
    });

    void waveSurferRef.current.load(monoUrl);

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [monoUrl]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-5">
        <div ref={waveFormRef} className="w-full" />
        <div className="flex w-full items-center justify-between">
          <Button
            size="icon"
            type="button"
            onClick={togglePlay}
            className="rounded-full bg-black px-4 py-2 text-white hover:bg-black/85"
          >
            {isPlaying ? (
              <Pause size={20} color="#FFFFFF" className="fill-white" />
            ) : (
              <Play size={20} color="#FFFFFF" className="fill-white" />
            )}
          </Button>
          <div className="flex items-center justify-center gap-2.5">
            <Button type="button" variant="destructive" onClick={() => setWarn(true)}>
              Delete
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" type="button">
                  <img src={DownloadIcon} alt="download" className="size-3.5" />
                  Audio
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuRadioGroup value={isMono} onValueChange={setIsMono}>
                  <DropdownMenuRadioItem onClick={download} value="mono">
                    Mono Audio
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem onClick={download} value="stereo">
                    Stereo Audio
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <WarningModal
        open={warn}
        title="Are you Sure"
        text={
          <span>
            You want to Delete this Call? <br />
            This action is irreversible. Please confirm to proceed.
          </span>
        }
        setOpen={setWarn}
        cta={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default AudioWave;
