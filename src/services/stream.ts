import instance from "@/lib/axios";

export const inferenceIndoBERT = async (formData: FormData) => {
  try {
    const res = await instance.post("/stream/IndoBERT", formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const inferenceBigBird = async (formData: FormData) => {
  try {
    const res = await instance.post("/stream/BigBird", formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};
