<?php

namespace App\Controller;

use App\Entity\Computer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ComputerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class ComputersController extends AbstractController
{
    /**
     * @Route("/api/computers", name="computers", methods={"GET"})
     */
    public function index(ComputerRepository $computerRepository, SerializerInterface $serializer): JsonResponse
    {
        $computers = $computerRepository->findAll();
        $json = $serializer->serialize($computers, 'json', ['groups' => 'attribution']);
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }


    /**
     * @Route("/api/computer/add", name="computer_add", methods={"POST"})
     */
    public function create(Request $request, ComputerRepository $computerRepo): Response
    {
        $data = json_decode($request->getContent(), true);
        $computerExist = $computerRepo->findOneBy(['name' => $data['name']]);

        if (!$computerExist) {
            $computer = new Computer();
            $computer->setName($data['name']);
            $doctrine = $this->getDoctrine()->getManager();
            $doctrine->persist($computer);
            $doctrine->flush();
            return $this->json($computer);
        } else {
            return $this->json(['success' => false, 'message' => 'Poste existe déjà']);
        }
    }


    /**
     * @Route("/api/computer/delete/{id}", name="computer_delete", methods={"DELETE"})
     */
    public function delete(Computer $computer, EntityManagerInterface $em): Response
    {
        $em->remove($computer);
        $em->flush();
        return $this->json([
            'success' => true,
            'message' => "Suppression réussie"
        ], 200);
    }
}
